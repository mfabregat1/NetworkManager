package com.projectefinal.app.servei;

import com.projectefinal.app.model.Result;
import com.projectefinal.app.model.Usuari;

public interface ServeiUsuari {

	//public Usuari buscarUsuariPerCorreu(String correu);
	//public void guardarUsuari(Usuari usuari);
	public Usuari iniciaSessio(String correu, String contrassenya);
	public Object llistarUsuari();
	public String eliminarUsuariPerId(int id);
	public Usuari buscarUsuari(int id);
	public String modificarUsuari(int id, String username, String nom, String cognom, String correu, String contrassenya, Boolean actiu, String rol);
	public String crearUsuari(String username, String nom, String cognom, String correu, String contrassenya, Boolean actiu, String rol);
	
}
