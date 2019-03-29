package com.projectefinal.app.servei;

import com.projectefinal.app.model.Usuari;

public interface ServeiUsuari {

	public Usuari buscarUsuariPerCorreu(String correu);
	public void guardarUsuari(Usuari usuari);
	
}
