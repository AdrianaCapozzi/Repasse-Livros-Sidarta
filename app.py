from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3

app = Flask(__name__)
app.secret_key = 'sua-chave-secreta'

# Conexão com o banco
def conectar_bd():
    return sqlite3.connect('livros.db')

# Página inicial (login)
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        nome = request.form['nome']
        senha = request.form['senha']

        con = conectar_bd()
        cur = con.cursor()
        cur.execute("SELECT * FROM usuarios WHERE nome = ? AND senha = ?", (nome, senha))
        usuario = cur.fetchone()
        con.close()

        if usuario:
            session['usuario_id'] = usuario[0]
            return redirect(url_for('perfil'))
        else:
            return "Login inválido, tente novamente."
    return render_template('login.html')

# Página de cadastro
@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        nome = request.form['nome']
        senha = request.form['senha']
        celular = request.form['celular']
        serie_2025 = request.form['serie_2025']
        tem_livros = request.form['tem_livros']

        con = conectar_bd()
        cur = con.cursor()
        cur.execute("INSERT INTO usuarios (nome, senha, celular, serie_2025, tem_livros) VALUES (?, ?, ?, ?, ?)",
                    (nome, senha, celular, serie_2025, tem_livros))
        con.commit()
        con.close()
        return redirect(url_for('login'))
    return render_template('cadastro.html')

# Página de perfil
@app.route('/perfil')
def perfil():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))

    usuario_id = session['usuario_id']
    con = conectar_bd()
    cur = con.cursor()
    cur.execute("SELECT * FROM usuarios WHERE id = ?", (usuario_id,))
    usuario = cur.fetchone()
    cur.execute("SELECT * FROM livros WHERE dono = ?", (usuario_id,))
    livros = cur.fetchall()
    con.close()
    return render_template('perfil.html', usuario=usuario, livros=livros)

# Página de livros por ciclo
@app.route('/livros')
def livros():
    con = conectar_bd()
    cur = con.cursor()
    cur.execute("SELECT * FROM livros")
    livros = cur.fetchall()
    con.close()
    return render_template('livros.html', livros=livros)

# Página de detalhes do livro
@app.route('/livro/<int:livro_id>')
def livro_detalhes(livro_id):
    con = conectar_bd()
    cur = con.cursor()
    cur.execute("SELECT * FROM livros WHERE id = ?", (livro_id,))
    livro = cur.fetchone()
    cur.execute("SELECT celular FROM usuarios WHERE id = ?", (livro[4],))
    celular = cur.fetchone()
    con.close()
    return render_template('livro_detalhes.html', livro=livro, celular=celular[0])

if __name__ == '__main__':
    app.run(debug=True)
