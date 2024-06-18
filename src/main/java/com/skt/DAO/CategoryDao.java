package com.skt.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skt.POJO.Category;
import java.util.List;

public interface CategoryDao extends JpaRepository<Category, Integer> {

    List<Category> getAllCategory();

}
