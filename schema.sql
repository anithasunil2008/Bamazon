create database bamazon_db;

use bamazon_db;

create table products(
	item_id integer auto_increment not null,
    product_name varchar(100) not null,
    department_name integer(11),
    price integer(11) not null,
    stock_quantity integer(11),
    primary key (item_id)
);

SELECT * FROM products;

insert into products (product_name, department_name, price, stock_quantity)
	values
		('Echo Dot', 'Electronic', 50, 14),
        ('Kindle', 'Electronic', 100, 10),
        ('Scooters', 'Sports', 150, 60),
        ('HeadPhones', 'Music', 40, 50),
        ('Magazines', 'Books', 30, 65),
        ('Tablets', 'Electronics', 135, 45),
        ('Chocolate', 'Food & Grocery', 10, 30),
        ('Mattress', 'Home', 500, 20),
        ('Tv', 'Electronics', 1120, 25),
        ('Echo', 'Electronics', 100, 15);

alter table products add product_sales integer(11) default 0;

create table departments(
	department_id integer auto_increment not null,
    department_name varchar(100) not null,
    over_head_costs integer(11) not null,
    product_sales integer(11) default 0,
    primary key (department_id)
);

insert into departments (department_name, over_head_costs)
	values
		('Electronics', 5000),
        ('Sports', 2000),
        ('Music', 4000),
        ('Food & Grocery', 3500),
        ('Books',4500),
        ('Home', 2500);

select * from departments;


select departments.department_id, departments.department_name, departments.over_head_costs, sum(products.product_sales) as total_sales, (  sum(products.product_sales) - departments.over_head_costs ) total_profit 
from products inner join departments on products.department_name = departments.department_name group by products.department_name, departments.department_id;