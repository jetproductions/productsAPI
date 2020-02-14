

CREATE TABLE IF NOT EXISTS product
(
    id SERIAL NOT NULL,
    name VARCHAR(255),
    slogan TEXT,
    description TEXT,
    category VARCHAR(255),
    default_price INT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS related
(
    id SERIAL NOT NULL,
    current_product_id INTEGER,
    related_product_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (current_product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS styles
(
    id SERIAL NOT NULL,
    productId INTEGER,
    name VARCHAR(255),
    sale_price VARCHAR(50),
    original_price INTEGER,
    default_style INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (productId) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS skus
(
    id SERIAL NOT NULL,
    styleId INTEGER,
    size VARCHAR(50),
    quantity INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (styleId) REFERENCES styles(id)
);

CREATE TABLE IF NOT EXISTS photos
(
    id SERIAL NOT NULL,
    styleId INTEGER,
    url TEXT,
    thumbnail_url TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (styleId) REFERENCES styles(id)
);

CREATE TABLE IF NOT EXISTS features
(
    id SERIAL NOT NULL,
    productId INTEGER,
    feature VARCHAR(255),
    value VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (productId) REFERENCES product(id)
);

\COPY product FROM '/Users/eldamarth/Documents/galvanize/SDC/csv/product.csv' DELIMITER ',' CSV HEADER;

\COPY related FROM '/Users/eldamarth/Documents/galvanize/SDC/csv/related.csv' DELIMITER ',' CSV HEADER;

\COPY styles FROM '/Users/eldamarth/Documents/galvanize/SDC/csv/styles.csv' DELIMITER ',' CSV HEADER;

\COPY skus FROM '/Users/eldamarth/Documents/galvanize/SDC/csv/skus.csv' DELIMITER ',' CSV HEADER;

\COPY photos FROM '/Users/eldamarth/Documents/galvanize/SDC/csv/photos.csv' DELIMITER ',' CSV HEADER;

\COPY features FROM '/Users/eldamarth/Documents/galvanize/SDC/csv/features.csv' DELIMITER ',' CSV HEADER;