package com.projectefinal.app.servei;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import com.projectefinal.app.model.Usuari;

@Service("serveiUsuari")
public class ServeiUsuariJpaDaoImpl implements ServeiUsuari {
	
	private EntityManagerFactory emf;
	
	@PersistenceUnit
	public void setEmf(EntityManagerFactory emf) {this.emf = emf;}
	
	//@Autowired
	//private RepositoriUsuari repositoriUsuari;
	
	//@Autowired
	//private RepositoriRol repositoriRol;
	
	//@Autowired
	//private BCryptPasswordEncoder bCryptPasswordEncoder;
	
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
	public Usuari iniciaSessio(String correu, String contrassenya) {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		System.out.println("Dades Inici Sessio");
		System.out.println(correu);
		System.out.println(contrassenya);
		String sql = "select id, username, nom, cognom, correu, contrassenya, actiu, rol from Usuari where correu='"+correu+"' and contrassenya='"+contrassenya+"'";
		Query query = em. 
		        createNativeQuery(sql, Usuari.class);

		List<Usuari> list = query.getResultList();
		
		Usuari usuariVO=(Usuari) list.get(0);
		em.close();
		
		return usuariVO;
	}
	
	@Override
	public Object llistarUsuari() {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		String sql = "select u.id, u.username, u.nom, u.cognom, u.correu, u.contrassenya, u.actiu, u.rol from Usuari u order by id asc";
		Query query = em. 
		        createNativeQuery(sql);

		List<Object> list = query.getResultList();
		
		Object usuariVO=(Object) list;
		em.close();
		
		return usuariVO;
	}
	
//	@Override
//	public void eliminarUsuariPerId(int id) {
//		Session session ;
//	    Usuari usuari ;
//
//	    session = sessionFactory.getCurrentSession();
//	    usuari = (Usuari)session.load(Usuari.class,id);
//	    session.delete(usuari);
//
//	    //This makes the pending delete to be done
//	    session.flush() ;
//	}
	
	@Override
	public String eliminarUsuariPerId(int id) {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		String sql = "delete from Usuari where id="+id;
		Query query = em.createNativeQuery(sql);
		int executeUpdate = query.executeUpdate();
		em.getTransaction().commit();
		em.close();
		return "ok";
	}
	
	@Override
	public Usuari buscarUsuari(int id) {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		String sql = "select id, username, nom, cognom, correu, contrassenya, actiu, rol from Usuari where id="+id;
		Query query = em. 
		        createNativeQuery(sql, Usuari.class);

		List<Usuari> list = query.getResultList();
		
		Usuari usuariVO=(Usuari) list.get(0);
		em.close();
		
		return usuariVO;
	}
	
	@Override
	public String modificarUsuari(int id, String username, String nom, String cognom, String correu, String contrassenya, Boolean actiu, String rol) {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		String sql = "update Usuari "
						+ "set username='"+username+"', "
						+ "nom='"+nom+"', "
						+ "cognom='"+cognom+"', "
						+ "correu='"+correu+"', "
						+ "contrassenya='"+contrassenya+"', "
						+ "actiu="+actiu+", "
						+ "rol='"+rol+"' "
						+ "where id="+id;
		Query query = em.createNativeQuery(sql);
		query.executeUpdate();
		em.getTransaction().commit();
		em.close();
		return "ok";
	}
	
	@Override
	public String crearUsuari(String username, String nom, String cognom, String correu, String contrassenya, Boolean actiu, String rol) {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		String sql = "insert into Usuari "
						+ "values (null, '"+username+"', '"+nom+"', '"+cognom+"', '"+correu+"', '"+contrassenya+"', "+actiu+", '"+rol+"')";
		Query query = em.createNativeQuery(sql);
		query.executeUpdate();
		em.getTransaction().commit();
		em.close();
		return "ok";
	}
}
