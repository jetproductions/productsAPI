CREATE DATABASE IF NOT EXISTS products;

CREATE TABLE IF NOT EXISTS product
(
    id SERIAL NOT NULL
    name VARCHAR(255)
    slogan TEXT
    description TEXT
    category VARCHAR(255)
    default_price INT
    CONSTRAINT product_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS related
(
    id SERIAL NOT NULL
    current_product_id INT
    related_product_id INT
    CONSTRAINT related_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS styles
(
    id SERIAL NOT NULL
    productId INT
    name VARCHAR(255)
    sale_price INT
    original_price INT
    default_style BINARY
    CONSTRAINT styles_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS skus
(
    id SERIAL NOT NULL
    styleId INT
    size VARCHAR(50)
    quantity INT
    CONSTRAINT skus_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS photos
(
    id SERIAL NOT NULL
    styleId INT
    url TEXT
    thumbnail_url TEXT
    CONSTRAINT photos_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS features
(
    id SERIAL NOT NULL
    productId INT
    feature VARCHAR(255)
    value VARCHAR(255)
    CONSTRAINT features_pkey PRIMARY KEY (id)
)

COPY product(name,slogan,description,category,default_price)
FROM '/Users/eldamarth/Documents/galvanize/SDC/csv/product.csv' DELIMITER ',' CSV HEADER

COPY related(current_product_id,related_product_id)
FROM '/Users/eldamarth/Documents/galvanize/SDC/csv/related.csv' DELIMITER ',' CSV HEADER

COPY styles(productId,name,sale_price,original_price,default_style)
FROM '/Users/eldamarth/Documents/galvanize/SDC/csv/styles.csv' DELIMITER ',' CSV HEADER

COPY skus(styleId,size,quantity)
FROM '/Users/eldamarth/Documents/galvanize/SDC/csv/skus.csv' DELIMITER ',' CSV HEADER

COPY photos(styleId,url,thumbnail_url)
FROM '/Users/eldamarth/Documents/galvanize/SDC/csv/photos.csv' DELIMITER ',' CSV HEADER

COPY features(productId,feature,value)
FROM '/Users/eldamarth/Documents/galvanize/SDC/csv/features.csv' DELIMITER ',' CSV HEADER