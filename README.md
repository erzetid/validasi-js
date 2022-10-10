# validasi-js

Library/package untuk memvalidasi objek javascript, mudah, ringan dan sederhana.

## Installation

```bash
  npm i validasi-js
```

## Penggunaan umum

### Contoh lolos validasi

```javascript
import CheckValue from "validasi-js";

const schema = {
  nama: CheckValue.string().alpha().max(25),
  //Jika nomor ingin disimpan dengan tipe "string" (Gunakan method string())
  noKTP: CheckValue.string().number(),
  email: CheckValue.string().email(),
  password: CheckValue.string().min(8),
};

const obj = {
  nama: "Budi Susanto",
  noKTP: "332966660046464997",
  email: "budisusanto@mail.com",
  password: "ET125tenggorokan",
};

const error = new CheckValue().object(schema).validate(obj);
console.log(error);

// hasil
// { nama: '', noKTP: '', email: '', password: '' }
```

### Contoh gagal validasi

```javascript
import CheckValue from "validasi-js";

const schema = {
  id: CheckValue.string().uuid(),
  lulus: CheckValue.boolean().truthy(),
};

const obj = {
  id: "WizPCaln6Q",
  lulus: false,
};

const error = new CheckValue().object(schema).validate(obj);
console.log(error);

// hasil
// { id: 'id must be a valid UUID', lulus: 'lulus must be true' }
```

### Contoh kustom pesan error

```javascript
import CheckValue from "validasi-js";

const schema = {
  startup: CheckValue.string().alpha(
    "Kolom startup hanya mendukung karakter alfabet."
  ),
  website: CheckValue.string().url("Harap masukan nama website dengan benar"),
};

const obj = {
  startup: "Admin Bengk3l",
  website: "adminbengkel.my.id", // harus diawali dengan http/https
};

const error = new CheckValue().object(schema).validate(obj);
console.log(error);

// {
//   startup: 'Kolom startup hanya mendukung karakter alfabet.',
//   website: 'Harap masukan nama website dengan benar'
// }
```

### Contoh kustom method

```typescript
interface IResult {
  message?: string;
  result: boolean;
}
type IMethod = (value: any, value2?: number) => IResult;

// Method custom tersedia untuk schema string, boolean, dan number
custom(method: IMethod, option: {value2?: number; message?: string;}): this;
```

#### Contoh dibawah menggunakan typescript, untuk native kamu bisa menyesuaikannya sendiri

```typescript
import CheckValue, { IMethod } from "validasi-js";

const bilanganGanjil: IMethod = (val: any) => {
  if (val % 2 !== 0) {
    return { result: false, message: "" };
  }
  return { result: true, message: "harus bilangan ganjil" };
};

const schema = {
  angka: CheckValue.number().custom(bilanganGanjil, {}),
};

const obj = {
  angka: 4,
};

// gunakan typeof schema agar key dapat diekstrak langsung ex: "error.angka"
const error = new CheckValue<typeof schema>().object(schema).validate(obj);
console.log(error);

// hasil
// { angka: 'angka harus bilangan ganjil' }
```

TERIMAKASIH SUDAH MAU MENCOBA `validasi-js`

Mohon saran dan masukannya
