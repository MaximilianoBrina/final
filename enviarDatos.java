import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/display-data")
public class enviarDatos extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private static final String DB_URL = "jdbc:mysql://sql212.infinityfree.com:3306/epiz_33583611_tareaobligatoria";
    private static final String DB_USER = "epiz_33583611";
    private static final String DB_PASSWORD = "o4VnbmVm9nxJ";

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String nombre = request.getParameter("nombre");
        String apellido = request.getParameter("apellido");
        String email = request.getParameter("email");
        int cantidad = Integer.parseInt(request.getParameter("cantidad"));
        String categoria = request.getParameter("categoria");
        double total = Double.parseDouble(request.getParameter("total"));

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "INSERT INTO TPCODOACODO (nombre, apellido, email, cantidad, categoria, total) " +
                    "VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement statement = conn.prepareStatement(sql);
            statement.setString(1, nombre);
            statement.setString(2, apellido);
            statement.setString(3, email);
            statement.setInt(4, cantidad);
            statement.setString(5, categoria);
            statement.setDouble(6, total);
            statement.executeUpdate();

            response.sendRedirect("ok.html");
        } catch (SQLException e) {
            e.printStackTrace();
            response.sendRedirect("error.html");
        }
    }
}