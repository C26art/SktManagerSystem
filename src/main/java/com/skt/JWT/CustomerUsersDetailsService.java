package com.skt.JWT;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.skt.DAO.UserDao;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CustomerUsersDetailsService implements UserDetailsService {

    @Autowired
    UserDao userDao;

    private com.skt.POJO.User userDetail;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Inside loadUserByUsername - Username: {}", username);

        userDetail = userDao.findByEmailId(username);

        if (userDetail == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        return new User(userDetail.getEmail(), userDetail.getPassword(), new ArrayList<>());
    }

    public com.skt.POJO.User getUserDetail() {
        return userDetail;
    }

}
