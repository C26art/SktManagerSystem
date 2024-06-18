package com.skt.servicelmpl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;
import java.io.InputStream;
import java.util.Optional;

import org.apache.pdfbox.io.IOUtils;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.skt.DAO.BillDao;
import com.skt.JWT.JwtFilter;
import com.skt.POJO.Bill;
import com.skt.constents.SktConstants;
import com.skt.service.BillService;
import com.skt.utils.SktUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BillServicelmpl implements BillService {

  @Autowired
  JwtFilter jwtFilter;

  @Autowired
  BillDao billDao;

  @Override
  public ResponseEntity<String> generateReport(Map<String, Object> requestMap) {
    log.info("Inside generateReport");

    try {
      log.info("Request Map: {}", requestMap);

      if (!validateRequestMap(requestMap)) {
        return SktUtils.getResponseEntity("Required data not found.", HttpStatus.BAD_REQUEST);
      }

      if (requestMap.get("productDetail") instanceof List) {
        log.info("Converting productDetail to JSON String");
        String productDetailJson = new JSONArray((List<?>) requestMap.get("productDetail")).toString();
        requestMap.put("productDetail", productDetailJson);
      }

      String fileName = SktUtils.getUUID();
      if (validateRequestMap(requestMap)) {
        if (requestMap.containsKey("isGenerate") && !(Boolean) requestMap.get("isGenerate")) {
          fileName = (String) requestMap.get("uuid");
        } else {
          requestMap.put("uuid", fileName);
          insertBill(requestMap);
        }
      }

      String data = "Name: " + requestMap.get("name") + "\n"
          + "Contact Number: " + requestMap.get("contactNumber") + "\n"
          + "Email: " + requestMap.get("email") + "\n"
          + "Payment Method: " + requestMap.get("paymentMethod");

      Document document = new Document();
      PdfWriter writer = PdfWriter.getInstance(document,
          new FileOutputStream(SktConstants.STORE_LOCATION + "\\" + fileName + ".pdf"));

      document.open();
      setRectangleInPdf(document);

      Paragraph chunk = new Paragraph("Skt Club Management System", getFont("Header"));
      chunk.setAlignment(Element.ALIGN_CENTER);
      document.add(chunk);

      Paragraph paragraph = new Paragraph(data + "\n \n", getFont("Data"));
      document.add(paragraph);

      PdfPTable table = new PdfPTable(5);
      table.setWidthPercentage(100);
      addTableHeader(table);

      JSONArray jsonArray = SktUtils.getJsonArrayFromString((String) requestMap.get("productDetail"));
      for (int i = 0; i < jsonArray.length(); i++) {
        addRows(table, SktUtils.getMapFromJson(jsonArray.getString(i)));
      }
      document.add(table);

      Paragraph footer = new Paragraph("Total: " + requestMap.get("total")
          + "\n" + "Thank You for your visit. Please visit again!", getFont("Data"));
      footer.setAlignment(Element.ALIGN_CENTER);
      document.add(footer);

      document.close();
      writer.close();

      String filePath = SktConstants.STORE_LOCATION + "\\" + fileName + ".pdf";
      if (!SktUtils.isFileExist(filePath)) {
        return SktUtils.getResponseEntity(SktConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return new ResponseEntity<>("{\"uuid\":\"" + fileName + "\"}", HttpStatus.OK);

    } catch (Exception ex) {
      log.error("Error generating report", ex);
      return new ResponseEntity<>(SktConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private void addRows(PdfPTable table, Map<String, Object> data) {
    log.info("Inside addRows");
    table.addCell(new Phrase((String) data.get("name"), getFont("Data")));
    table.addCell(new Phrase((String) data.get("category"), getFont("Data")));
    table.addCell(new Phrase((String) data.get("quantity"), getFont("Data")));
    table.addCell(new Phrase(data.get("price").toString(), getFont("Data")));
    table.addCell(new Phrase(data.get("total").toString(), getFont("Data")));
  }

  private void addTableHeader(PdfPTable table) {
    log.info("Inside addTableHeader");
    Stream.of("Name", "Category", "Quantity", "Price", "Sub Total")
        .forEach(columnTitle -> {
          PdfPCell header = new PdfPCell();
          header.setBackgroundColor(BaseColor.LIGHT_GRAY);
          header.setBorderWidth(2);
          header.setBackgroundColor(BaseColor.YELLOW);
          header.setPhrase(new Phrase(columnTitle, getFont("Data")));
          header.setHorizontalAlignment(Element.ALIGN_CENTER);
          header.setVerticalAlignment(Element.ALIGN_MIDDLE);
          table.addCell(header);
        });
  }

  private Font getFont(String type) {
    log.info("Inside getFont");

    switch (type) {
      case "Header":
        return FontFactory.getFont(FontFactory.HELVETICA_BOLDOBLIQUE, 18, Font.BOLD, BaseColor.BLACK);
      case "Data":
        return FontFactory.getFont(FontFactory.TIMES_ROMAN, 11, Font.BOLD, BaseColor.BLACK);
      default:
        return new Font();
    }
  }

  private void setRectangleInPdf(Document document) throws DocumentException {
    log.info("Inside setRectangleInPdf");

    Rectangle rect = new Rectangle(577, 825, 18, 15);
    rect.enableBorderSide(Rectangle.LEFT);
    rect.enableBorderSide(Rectangle.RIGHT);
    rect.enableBorderSide(Rectangle.TOP);
    rect.enableBorderSide(Rectangle.BOTTOM);
    rect.setBorderColor(BaseColor.BLACK);
    rect.setBorderWidth(1);
    document.add(rect);
  }

  private void insertBill(Map<String, Object> requestMap) {
    try {
      log.info("Inside insertBill");
      Bill bill = new Bill();
      bill.setUuid((String) requestMap.get("uuid"));
      bill.setName((String) requestMap.get("name"));
      bill.setEmail((String) requestMap.get("email"));
      bill.setContactNumber((String) requestMap.get("contactNumber"));
      bill.setPaymentMethod((String) requestMap.get("paymentMethod"));
      bill.setTotal(Integer.parseInt((String) requestMap.get("totalAmount")));
      bill.setProductDetail((String) requestMap.get("productDetail"));
      bill.setCreatedBy(jwtFilter.getCurrentUser());
      billDao.save(bill);

      log.info("Bill to be saved: {}", bill);
    } catch (Exception ex) {
      log.error("Error inserting bill", ex);
    }
  }

  private boolean validateRequestMap(Map<String, Object> requestMap) {
    boolean isValid = requestMap.containsKey("name") && requestMap.containsKey("contactNumber")
        && requestMap.containsKey("email") && requestMap.containsKey("paymentMethod")
        && requestMap.containsKey("productDetail") && requestMap.containsKey("totalAmount");

    if (!isValid) {
      log.warn("Invalid request map: {}", requestMap);
    }

    return isValid;
  }

  @Override
  public ResponseEntity<List<Bill>> getBills() {

    List<Bill> list = new ArrayList<>();
    if (jwtFilter.isAdmin()) {
      list = billDao.getAllBills();
    } else {
      list = billDao.getBillByUsername(jwtFilter.getCurrentUser());
    }
    return new ResponseEntity<>(list, HttpStatus.OK);
  }

  public ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap) {
    log.info("Inside getPdf : requestMap {}", requestMap);

    try {
      byte[] byteArray = new byte[0];
      if (!requestMap.containsKey("uuid") || !validateRequestMap(requestMap)) {
        log.warn("Invalid request data: {}", requestMap);
        return new ResponseEntity<>(byteArray, HttpStatus.BAD_REQUEST);
      }

      String filePath = SktConstants.STORE_LOCATION + "\\" + (String) requestMap.get("uuid") + ".pdf";
      if (SktUtils.isFileExist(filePath)) {
        byteArray = getByteArray(filePath);
        return new ResponseEntity<>(byteArray, HttpStatus.OK);
      } else {
        log.info("File not found, generating report: {}", filePath);
        requestMap.put("isGenerate", false);
        generateReport(requestMap);
        byteArray = getByteArray(filePath);
        return new ResponseEntity<>(byteArray, HttpStatus.OK);
      }

    } catch (Exception ex) {
      log.error("Exception in getPdf: ", ex);
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private byte[] getByteArray(String filePath) throws Exception {
    File initiaFile = new File(filePath);
    InputStream targStream = new FileInputStream(initiaFile);
    byte[] byteArray = IOUtils.toByteArray(targStream);
    targStream.close();
    return byteArray;
  }

  @Override
  public ResponseEntity<String> deleteBill(Integer id) {

    try {
      Optional<Bill> optional = billDao.findById(id);
      if (!optional.isEmpty()) {
        billDao.deleteById(id);
        return SktUtils.getResponseEntity("Bill delete Successfully!", HttpStatus.OK);
      }
      return SktUtils.getResponseEntity("Bill id is not exist.", HttpStatus.OK);

    } catch (Exception ex) {
      ex.printStackTrace();
    }
    return SktUtils.getResponseEntity(SktConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
