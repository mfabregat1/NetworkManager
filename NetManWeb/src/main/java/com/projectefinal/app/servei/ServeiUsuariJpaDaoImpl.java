package com.projectefinal.app.servei;

import java.util.Arrays;
import java.util.HashSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;

import com.projectefinal.app.model.Rol;
import com.projectefinal.app.model.Usuari;
import com.projectefinal.app.repositori.RepositoriRol;
import com.projectefinal.app.repositori.RepositoriUsuari;

@Service("serveiUsuari")
public class ServeiUsuariJpaDaoImpl implements ServeiUsuari {
	
	private EntityManagerFactory emf;
	
	@Autowired
	private RepositoriUsuari repositoriUsuari;
	
	@Autowired
	private RepositoriRol repositoriRol;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	/*@Override
	public Usuari buscarUsuariPerCorreu(String correu) {
		return repositoriUsuari.buscarPerCorreu(correu);
	}*/

	/*@Override
	public void guardarUsuari(Usuari usuari) {
		usuari.setContrassenya(bCryptPasswordEncoder.encode(usuari.getContrassenya()));
		usuari.setActiu(1);
		Rol rolUsuari = repositoriRol.buscarPerRol("ROL_ADMIN");
		usuari.setRols(new HashSet<Rol>(Arrays.asList(rolUsuari)));
		repositoriUsuari.save(usuari);
	}*/

	@Override
	public Usuari login(String correu, String contrassenya) {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		TypedQuery<Usuari> query = (TypedQuery<Usuari>) em.createNativeQuery("select * from usuari where correu="+correu+" and contrassenya="+contrassenya);
		System.out.println(query);
		return null;
	}

}
