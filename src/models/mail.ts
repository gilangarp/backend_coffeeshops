export interface MailOptions {
    from: string; // alamat pengirim email (harus sesuai dengan pengaturan transporter)
    to: string | string[]; // alamat penerima email (bisa berupa string tunggal atau array)
    subject: string; // subjek email
    text?: string; // teks email (opsional)
    html?: string; // teks HTML email (opsional)
}

export interface Transporter {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}