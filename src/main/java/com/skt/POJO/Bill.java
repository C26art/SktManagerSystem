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

@NamedQuery(name = "Bill.getAllBills", query = "select b from Bill b order by b.id desc")
@NamedQuery(name = "Bill.getBillByUsername", query = "select b from Bill b where b.createdBy=:username order by b.id desc")

@Data
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "bill")
public class Bill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "uuid")
    private String uuid;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "contactNumber")
    private String contactNumber;

    @Column(name = "paymentMethod")
    private String paymentMethod;

    @Column(name = "total")
    private Integer total;

    @Column(name = "productDetail", columnDefinition = "json")
    private String productDetail;

    @Column(name = "createdBy")
    private String createdBy;

}
