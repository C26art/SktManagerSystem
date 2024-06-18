package com.skt.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.skt.POJO.Bill;
import java.util.List;

public interface BillDao extends JpaRepository<Bill, Integer> {

    List<Bill> getAllBills();

    List<Bill> getBillByUsername(@Param("username") String username);

}
