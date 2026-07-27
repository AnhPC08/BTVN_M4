-- BT1:
CREATE DATABASE LibraryDB;
USE LibraryDB;

CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(100),
    PublishedYear INT
);

-- BT2:
INSERT INTO Books (Title, Author, PublishedYear)
VALUES
('Dac Nhan Tam', 'Dale Carnegie', 1936),
('Nha Gia Kim', 'Paulo Coelho', 1988),
('Toi Thay Hoa Vang Tren Co Xanh', 'Nguyen Nhat Anh', 2010);

SELECT * FROM Books;

UPDATE Books
SET PublishedYear = 2024
WHERE BookID = 1;

SELECT * FROM Books;

DELETE FROM Books
WHERE BookID = 3;

SELECT * FROM Books;

-- BT3:
SELECT * FROM Books WHERE PublishedYear > 2020;
SELECT * FROM Books WHERE Author = 'Nguyen Van A' OR Title LIKE 'Lập trình%';
SELECT * FROM Books ORDER BY PublishedYear DESC, Title ASC LIMIT 2;

-- BT4: 
ALTER TABLE Books ADD COLUMN Price DECIMAL;
ALTER TABLE Books MODIFY COLUMN Author VARCHAR(255);
TRUNCATE TABLE Books;


-- BT5:
CREATE TABLE Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(255) NOT NULL,
    Email VARCHAR(255)
);

CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    OrderDate DATETIME,
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

INSERT INTO Customers (FullName, Email) 
VALUES 
('Nguyễn Văn A', 'nva@gmail.com'),
('Trần Thị B', 'ttb@gmail.com');

INSERT INTO Orders (OrderDate, CustomerID) 
VALUES 
('2026-07-27 08:30:00', 1),
('2026-07-27 15:45:00', 1),
('2026-07-27 19:20:00', 2);

SELECT 
    Orders.OrderID, 
    Orders.OrderDate, 
    Customers.FullName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;