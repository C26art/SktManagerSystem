use sktclub;

select * from user;

update user set status='false' where id = 10;

update user set role='admin' where id = 9;

update user set email='cristiano@mailinator.com' where id = 10;

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

select * from category;

select * from product;
