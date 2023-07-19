# Clothing Brand

## Deskripsi

Clothing app ini merupakan simple e-commerce yang produknya berupa kaos programmer

## Fitur

Fitur yang terdapat pada website ini diantaranya, untuk sistem autentikasi menggunakan bcryptjs untuk hasing password, terus untuk pengamain servernya menggunakan jwt. Selain itu juga terdapat social login menggunakan google.

Website ini juga menggunakan pinia untuk state managemet dan vue router. Terdapat juga mini transaksi yang menggunakan midtrans sebagai payment gateway.

Tech Stack:

-   Node
-   Vue
-   Seqeulize (Postgress SQL)
-   Tailwind

## Instalasi

Pastikan untuk menginstall sequelizr dulu secara global

```
npm install -g sequelize-cli
```

Selain itu kalian juga harus install nodemon

```
npm install -g nodemon
```

Kalian bisa masuk ke masing-masing sub folder seperti `cliet-admin`, `client-user`, dan `server` untuk menginstall semua dependecy dengan cara `npm install`

Khusus untuk sub folder `server` ada beberapa konfigurasi yang diperlukan, contoh:

1. Buat database

```
sequelize db:create
```

2. Buat table

```
sequelize db:migrate
```

3. Memasukan data dummy

```
sequelize db:seed:all
```

Mungkin itu aja untuk konfigurasinya, jika kalian ingin menjalankan masing-masing sevice tinggal running perintah `npm run dev`

## Penggunaan

Pada website ini disediakan dua website, pertama untuk admin dan kedua untuk user. Untuk website admin, kita dapat melakukan crud seperti pada umumnya. Sedangkan website user digunakan untuk melihat produk serta membeli produk tersebut.

## Kontribusi

Jika teman-teman berminat untuk mengembangkan project ini, saya perilakan.
