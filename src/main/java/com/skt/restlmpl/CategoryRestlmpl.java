package com.skt.restlmpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.skt.POJO.Category;
import com.skt.constents.SktConstants;
import com.skt.rest.CategoryRest;
import com.skt.service.CategoryService;
import com.skt.utils.SktUtils;

@RestController
public class CategoryRestlmpl implements CategoryRest {

    @Autowired
    CategoryService categoryService;

    @Override
    public ResponseEntity<String> addNewCategory(Map<String, String> requestMap) {

        try {

            return categoryService.addNewCategory(requestMap);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return SktUtils.getResponseEntity(SktConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Category>> getAllCategory(String filterValue) {

        try {

            return categoryService.getAllCategory(filterValue);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCategory(Map<String, String> requestMap) {

        try {

            return categoryService.updateCategory(requestMap);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return SktUtils.getResponseEntity(SktConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
