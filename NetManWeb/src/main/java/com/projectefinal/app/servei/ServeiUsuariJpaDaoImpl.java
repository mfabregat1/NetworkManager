package com.projectefinal.app.servei;

import java.util.Arrays;
import java.util.HashSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.projectefinal.app.model.Rol;
import com.projectefinal.app.model.Usuari;
import com.projectefinal.app.sepositori.RepositoriRol;
import com.projectefinal.app.sepositori.RepositoriUsuari;

@Service("serveiUsuari")
public class ServeiUsuariJpaDaoImpl implements ServeiUsuari {
	@Autowired
	private RepositoriUsuari repositoriUsuari;
	
	@Autowired
	private RepositoriRol repositoriRol;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public Usuari buscarUsuariPerCorreu(String correu) {
		return repositoriUsuari.buscarPerCorreu(correu);
	}

	@Override
	public void guardarUsuari(Usuari usuari) {
		usuari.setContrassenya(bCryptPasswordEncoder.encode(usuari.getContrassenya()));
		usuari.setActiu(1);
		Rol rolUsuari = repositoriRol.buscarPerRol("ROL_ADMIN");
		usuari.setRols(new HashSet<Rol>(Arrays.asList(rolUsuari)));
		repositoriUsuari.save(usuari);
	}

}
