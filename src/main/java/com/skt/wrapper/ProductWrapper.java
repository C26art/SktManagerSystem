package com.skt.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class ProductWrapper {

    private Integer id;
    private String name;
    private String description;
    private BigDecimal price;
    private String status;
    private Integer categoryId;
    private String categoryName;

    public ProductWrapper(Integer id, String name, String description, BigDecimal price, String status,
            Integer categoryId, String categoryName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.status = status;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public ProductWrapper(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public ProductWrapper(Integer id, String name, String description, BigDecimal price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
}
