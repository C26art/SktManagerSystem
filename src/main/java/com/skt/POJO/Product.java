package com.skt.POJO;

import org.hibernate.annotations.DynamicUpdate;
import java.io.Serializable;
import java.math.BigDecimal;
import org.hibernate.annotations.DynamicInsert;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import lombok.Data;

@NamedQuery(name = "Product.getAllProduct", query = "select new com.skt.wrapper.ProductWrapper(p.id, p.name, p.description, p.price, p.status, p.category.id, p.category.name) from Product p")
@NamedQuery(name = "Product.updateProductStatus", query = "update Product p set p.status=:status where p.id=:id")
@NamedQuery(name = "Product.getProductByCategory", query = "select new com.skt.wrapper.ProductWrapper(p.id, p.name) from Product p where p.category.id=:id and p.status='true'")
@NamedQuery(name = "Product.getProductById", query = "select new com.skt.wrapper.ProductWrapper(p.id, p.name, p.description, p.price) from Product p where p.id=:id")

@Data
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_fk", nullable = false)
    private Category category;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "status")
    private String status;
}
