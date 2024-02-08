# CS-340

# DB Output
```
+--------------------------+
| Tables_in_cs340_hudeihem |
+--------------------------+
| Authors                  |
| AuthorsBooks             |
| Books                    |
| Customers                |
| Invoices                 |
| Stores                   |
+--------------------------+
6 rows in set (0.001 sec)

+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| authorID  | int(11)      | NO   | PRI | NULL    | auto_increment |
| firstName | varchar(255) | NO   |     | NULL    |                |
| lastName  | varchar(255) | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
3 rows in set (0.001 sec)

+--------------+---------+------+-----+---------+----------------+
| Field        | Type    | Null | Key | Default | Extra          |
+--------------+---------+------+-----+---------+----------------+
| authorBookID | int(11) | NO   | PRI | NULL    | auto_increment |
| bookID       | int(11) | NO   | MUL | NULL    |                |
| authorID     | int(11) | YES  | MUL | NULL    |                |
+--------------+---------+------+-----+---------+----------------+
3 rows in set (0.001 sec)

+-------------------+---------------+------+-----+---------+----------------+
| Field             | Type          | Null | Key | Default | Extra          |
+-------------------+---------------+------+-----+---------+----------------+
| bookID            | int(11)       | NO   | PRI | NULL    | auto_increment |
| title             | varchar(255)  | NO   |     | NULL    |                |
| yearOfPublication | year(4)       | NO   |     | NULL    |                |
| price             | decimal(12,2) | NO   |     | NULL    |                |
+-------------------+---------------+------+-----+---------+----------------+
4 rows in set (0.001 sec)

+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| customerID | int(11)      | NO   | PRI | NULL    | auto_increment |
| firstName  | varchar(255) | NO   |     | NULL    |                |
| lastName   | varchar(255) | NO   |     | NULL    |                |
| email      | varchar(100) | NO   | UNI | NULL    |                |
| phone      | varchar(30)  | NO   | UNI | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
5 rows in set (0.001 sec)

+------------+---------+------+-----+---------+----------------+
| Field      | Type    | Null | Key | Default | Extra          |
+------------+---------+------+-----+---------+----------------+
| invoiceID  | int(11) | NO   | PRI | NULL    | auto_increment |
| date       | date    | NO   |     | NULL    |                |
| bookID     | int(11) | NO   | MUL | NULL    |                |
| storeID    | int(11) | NO   | MUL | NULL    |                |
| customerID | int(11) | NO   | MUL | NULL    |                |
+------------+---------+------+-----+---------+----------------+
5 rows in set (0.001 sec)

+---------+--------------+------+-----+---------+----------------+
| Field   | Type         | Null | Key | Default | Extra          |
+---------+--------------+------+-----+---------+----------------+
| storeID | int(11)      | NO   | PRI | NULL    | auto_increment |
| name    | varchar(255) | NO   |     | NULL    |                |
| phone   | varchar(30)  | NO   | UNI | NULL    |                |
| address | varchar(255) | NO   |     | NULL    |                |
+---------+--------------+------+-----+---------+----------------+
4 rows in set (0.001 sec)

+----------+-----------+------------+
| authorID | firstName | lastName   |
+----------+-----------+------------+
|        1 | Edgar     | Patterson  |
|        2 | William   | Fitzgerald |
|        3 | George    | Wolf       |
|        4 | Mike      | Lang       |
+----------+-----------+------------+
4 rows in set (0.000 sec)

+--------------+--------+----------+
| authorBookID | bookID | authorID |
+--------------+--------+----------+
|            1 |      1 |        1 |
|            2 |      1 |        2 |
|            3 |      2 |        2 |
|            4 |      3 |        3 |
|            5 |      4 |     NULL |
+--------------+--------+----------+
5 rows in set (0.000 sec)

+--------+----------------------+-------------------+--------+
| bookID | title                | yearOfPublication | price  |
+--------+----------------------+-------------------+--------+
|      1 | Linear Algebra       |              2005 |  80.00 |
|      2 | Discrete Mathematics |              1992 |  90.99 |
|      3 | Organic Chemistry    |              2020 | 120.00 |
|      4 | Statistics           |              2021 | 115.00 |
+--------+----------------------+-------------------+--------+
4 rows in set (0.000 sec)

+------------+-----------+-----------+----------------------+--------------+
| customerID | firstName | lastName  | email                | phone        |
+------------+-----------+-----------+----------------------+--------------+
|          1 | Patricia  | Carlson   | pcarlson@gmail.com   | 667-222-4521 |
|          2 | Selena    | Lozada    | slozada@gmail.com    | 701-548-1944 |
|          3 | Michael   | Karlsson  | mkarlsson@gmail.com  | 402-666-1234 |
|          4 | Sergio    | Hernandez | shernandez@gmail.com | 801-951-3574 |
+------------+-----------+-----------+----------------------+--------------+
4 rows in set (0.000 sec)

+-----------+------------+--------+---------+------------+
| invoiceID | date       | bookID | storeID | customerID |
+-----------+------------+--------+---------+------------+
|         1 | 2021-02-25 |      1 |       1 |          1 |
|         2 | 2021-03-19 |      2 |       1 |          1 |
|         3 | 2023-10-10 |      2 |       2 |          2 |
|         4 | 2022-02-05 |      1 |       1 |          4 |
+-----------+------------+--------+---------+------------+
4 rows in set (0.000 sec)

+---------+----------------------+--------------+---------------------------------------+
| storeID | name                 | phone        | address                               |
+---------+----------------------+--------------+---------------------------------------+
|       1 | Metropolitan Stories | 402-547-6787 | 1 Broad Court, Irmo, SC 29063         |
|       2 | Literary Books       | 542-888-2167 | 121 Main Lane, Pataskala, OH 43062    |
|       3 | Bookshelf Boutique   | 901-325-4321 | 9906 W. Union Street, Burke, VA 22015 |
+---------+----------------------+--------------+---------------------------------------+
3 rows in set (0.000 sec)
```
