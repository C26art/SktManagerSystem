package com.skt.servicelmpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.common.base.Strings;
import com.skt.DAO.CategoryDao;
import com.skt.JWT.JwtFilter;
import com.skt.POJO.Category;
import com.skt.constents.SktConstants;
import com.skt.service.CategoryService;
import com.skt.utils.SktUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CategoryServicelmpl implements CategoryService {

    @Autowired
    CategoryDao categoryDao;

    @Autowired
    JwtFilter jwtFilter;

    @Override
    public ResponseEntity<String> addNewCategory(Map<String, String> requestMap) {

        try {

            if (jwtFilter.isAdmin()) {

                if (validateCategoryMap(requestMap, false)) {

                    categoryDao.save(getCategoryFromMap(requestMap, false));
                    return SktUtils.getResponseEntity("Category Added Successfully", HttpStatus.OK);

                }

            } else {
                return SktUtils.getResponseEntity(SktConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return SktUtils.getResponseEntity(SktConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateCategoryMap(Map<String, String> requestMap, boolean validateId) {

        if (requestMap.containsKey("name")) {
            if (requestMap.containsKey("id") && validateId) {
                return true;
            } else if (!validateId) {

                return true;
            }
        }
        return false;
    }

    private Category getCategoryFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Category category = new Category();
        if (isAdd) {
            category.setId(Integer.parseInt(requestMap.get("id")));
        }
        category.setName(requestMap.get("name"));
        return category;
    }

    @Override
    public ResponseEntity<List<Category>> getAllCategory(String filterValue) {

        try {

            if (!Strings.isNullOrEmpty(filterValue) && filterValue.equalsIgnoreCase("true")) {
                log.info("Inside if");
                return new ResponseEntity<List<Category>>(categoryDao.getAllCategory(), HttpStatus.OK);
            }
            return new ResponseEntity<>(categoryDao.findAll(), HttpStatus.OK);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<List<Category>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCategory(Map<String, String> requestMap) {

        try {

            if (jwtFilter.isAdmin()) {
                if (validateCategoryMap(requestMap, true)) {
                    Optional optional = categoryDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()) {

                        categoryDao.save(getCategoryFromMap(requestMap, true));
                        return SktUtils.getResponseEntity("Category updated Successfully!", HttpStatus.OK);

                    } else {
                        return SktUtils.getResponseEntity("Category id doesn't exist", HttpStatus.OK);
                    }
                }
                return SktUtils.getResponseEntity(SktConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);

            } else {
                return SktUtils.getResponseEntity(SktConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return SktUtils.getResponseEntity(SktConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
