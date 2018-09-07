var mysql = require('mysql');

    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      port: '3306',
      database: 'db-1',
    });

    connection.connect();
    // 查询
    var sql = 'SELECT * FROM blog_data';
    // 删除
    var delSql = 'DELETE FROM table_test where id=0';
    // 插入
    var addSql = 'INSERT INTO table_test(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
    var addSqlParams = ['菜鸟工具', 'https://c.runoob.com', '23453', 'CN'];
    // 更新
    var modSql = 'UPDATE table_test SET name = ?,url = ? WHERE Id = ?';
    var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com', 6];

    //查询数据库数据
    connection.query(sql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
      } else {

        var data = JSON.stringify(result)
        console.log(data)
        // var e = document.querySelector('.contain')
        // e.insertAdjacentHTML('beforeend', `<div>${data}</div>`)
      }

    });

    connection.end();