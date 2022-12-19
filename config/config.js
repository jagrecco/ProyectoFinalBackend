
const conexion = {

    archivo: { ruta: "./db" },

    memoria: {
        productos:[],
        OTROSproductos: [
        {
            nombre: 'Escuadra',
            descripcion: 'Escuadra plástica',
            precio: 890,
            foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
            stock: 100,
            codigo: 'AAB123',
            timestamp: { _seconds: 1662331498, _nanoseconds: 907000000 },
            id: 'XqolfwrM7sdqhcfL0d6B'
        },
        {
            nombre: 'Cartuchera simple',
            descripcion: 'Portalápices plástico clásico',
            precio: 150,
            foto: 'https://i.picsum.photos/id/119/3264/2176.jpg?hmac=PYRYBOGQhlUm6wS94EkpN8dTIC7-2GniC3pqOt6CpNU',
            stock: 100,
            codigo: '0A0B0C0D0',
            timestamp: { _seconds: 1662331498, _nanoseconds: 907000000 },
            id: 'fPU8XXr1u0tGljx8Mdpc'
          
        },
        {
            nombre: 'Acuarela',
            descripcion: 'Acuarela 12 colores',
            precio: 510,
            foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/paint-color-pallete-brush-academy-256.png',
            stock: 100,
            codigo: 'AAB123',
            timestamp: { _seconds: 1662345075, _nanoseconds: 982000000 },
            id: 'kpFyf4XSSyx7uPNmxAtw'
        },
        {
            nombre: 'Calculadora',
            descripcion: 'Calculadora escolar',
            precio: 255,
            foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
            stock: 100,
            codigo: 'AAB123',
            timestamp: { _seconds: 1662344837, _nanoseconds: 65000000 },
            id: 'lE827y8hGyw1YnEWG5vg'
        },
        {
            nombre: 'Lápiz',
            descripcion: 'Lápiz HB',
            precio: 325,
            codigo: 'AAB123',
            timestamp: { _seconds: 1662344966, _nanoseconds: 749000000 },
            foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-128.png',
            stock: 100,
            id: 'mWJTaBOwuFArZs3d6hYX'
        },
        {
            nombre: 'Cartuchera simple',
            descripcion: 'Cartuchera plástica de 20cm',
            precio: 150,
            codigo: '000B000',
            timestamp: { _seconds: 1662344966, _nanoseconds: 749000000 },
            foto: 'https://i.picsum.photos/id/119/3264/2176.jpg?hmac=PYRYBOGQhlUm6wS94EkpN8dTIC7-2GniC3pqOt6CpNU',
            stock: 100,
            id: 'vF8hBEaaavlMa2wk4F2u'
        }
    ],

    carrito: []

    },

    mongoDbCon: { dbURI : "mongodb+srv://jag:Fj2TzgY2oVs0oFHY@clustertest0.k6leblk.mongodb.net/?retryWrites=true&w=majority" },

    firebase: {
        "type": "service_account",
        "project_id": "backend-7e3a4",
        "private_key_id": "d53890e1b9a3d85c81960f9e52c5501df146aa6e",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMdU1OYFzar1Id\nHwsVVs5U4IWJuXPai+H+3tojwd3F3sQnF5qZZdivyqSGTyyfAxHBv8g6ZL+dcIDS\nsiF86GM5gH+x3/qlX5C4nbo1vLLlaTsEmiyVkzXikHqBVbitjAGKjyCE+7O3Y7pE\nMgRxIcYStpbk0uQW2IUMpiUS87zp+OR/cXg8lGEhI8RCSJ8DUNjBLSiaFzxQwfkB\nypnvLwQAzRAo8IvpmQmeEH9ELqLNARN760MurMwCakc9dB5mZwFpLFGPVUQG5Smz\n3G67nbT4uwSNmCoMFBAo4UnwZxwIRGRCc/nrprZHS9+ATQTi5UNzGgIocHRcsf40\nlhEx9kGxAgMBAAECggEAJWWmSnnzOfe79gIl2ZUbX+iCXG7cq0KPR3pVHZm5+hWV\nPM5DM6AumnbfEYb9UydxUcZFtjKT3tUDZyZ4XBu4fH3NvYgJlUKN2srU0rvtX+tX\nxW96zLAUuNhy4+G9ShcT+BdWXCSa2mYmHY+lgtjp3SXjIz8Uw73+VhI0sUr+SLAv\nPt5mHZccvboTuVmh7xu2NKIGbi8CKnVxnj2B+xQ1MpWfkMfXLhWStQAkebPeCynE\nS+FbPXgTp3tAu8gGiheUJk6RyWPi7UDw61RcXMtpSvpAoKGwRjyMjSzJCHYRp+HY\njGo09V+CviF7zu9hb87V2+FNJJ3pW0alSrV8Id+t7QKBgQDuCiW7jbsoGdHJbEuN\nXk9g5VC7TKf7b3aeZhXs5f0uUhAfVaXT3jF9kqj8VXtRfk6ObiDNA7yzrTzDOt4l\nsx8bmlIpAln3Yqo+WJmqY+gvV+B7GAiXc8HwBWiJfPREMkjSLEveXdjK6XnL5Ydb\nVMRYUBsNRpfyCLiaLw+wLg8bDQKBgQDb4oNHcEwVm5Pf+LjLAR3Sgf7MUlep4K2S\n8QU4hVwilFGywDObcfIDZtwA9SdBE4CjZcu4EiBG5faDk7BrXnUhQqJwQ92XexBb\nw3NsLSFG+5mLATIe5R7vMOyTuefBEOjGA3Q6gf1kMMVFBNEXLU4kQ8o+e26Hx83K\neu82t6JINQKBgD919RlLb9oBCCzq8jl+Kytp91v309D0pmsUTEQcDKOMvT+dVdhm\nJEuWDfc30uinA8p1EcmWdXhxdwGVcCQc3O4+9ih4uAN8CmcUt+L1P7FffDlU7vVx\npwKWbog5B+YmgcOGi7N80Y9HL3Fsf+mZb78bnBqt91RPfuecJFKT9PMBAoGARx5b\nUabbpP199aoPsvE4gRa0n8dePT7DRUyZYK+ZnkGUrxkFWBihq0IAlHq2aJDzQWYy\nXuXV9Lh6ZBJHtGKHxes0eNUqfc06/EMaOPnb0oacId6QJHf86mZLjnhJoiNi9nC1\njhrvJxGzLGCjdDieFpKqfk0T8ezI/d2HM45veaUCgYEAyuU91Fz5dGMADH6smQRe\nKTVyXi5hvyVxP8cIsIHwm8Ev8ChSwBWth+sERi6GAoobWGIHfiKV0/MviqdVvCEj\n3xQU4kIjcGKp/p3VNDHfsLOQ8TBTWoERDOcxdVeWdHGnLUiHFyqR878hfSJY+VJT\nGjCFXJRtjKPK5jtO1XdAQqU=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-5in5g@backend-7e3a4.iam.gserviceaccount.com",
        "client_id": "111023547677390585315",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5in5g%40backend-7e3a4.iam.gserviceaccount.com"
    }

}

export default conexion;