package com.skt.POJO;

import org.hibernate.annotations.DynamicUpdate;

import java.io.Serializable;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import lombok.Data;

@NamedQuery(name = "Category.getAllCategory", query = "select c from Category c where c.id in (select p.category.id from Product p where p.status='true')")

@Data
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "category")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

}
