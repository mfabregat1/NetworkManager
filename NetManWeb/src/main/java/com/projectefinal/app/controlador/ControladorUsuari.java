package com.projectefinal.app.controlador;



import javax.net.ssl.SSLSocketFactory;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;

import com.projectefinal.app.model.Result;
import com.projectefinal.app.model.Usuari;
import com.projectefinal.app.servei.ServeiUsuari;

import me.legrange.mikrotik.*;
import me.legrange.mikrotik.impl.*;
import me.legrange.mikrotik.examples.*;

import java.util.List;
import java.util.Map;

import javax.net.SocketFactory;
import javax.net.ssl.SSLSocketFactory;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class ControladorUsuari {
	
	@Autowired
	private ServeiUsuari serveiUsuari;
	
	protected ApiConnection aConn;
	
	
	@RequestMapping(value= {"/inicia-sessio"}, method=RequestMethod.GET)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Usuari login(@RequestParam("l_correu") String correu, @RequestParam("l_contrassenya") String contrassenya, HttpServletRequest request) {
		System.out.println(correu);
		System.out.println(contrassenya);
		System.out.println("ksjdhfkjshdf kasjhdflk jash fdlkjashdf lkjshdf lkajshfdlkjsah dflkjh");
		Usuari usuariLogin = (Usuari) serveiUsuari.iniciaSessio(correu, contrassenya);
		return usuariLogin;
	}
	
	@RequestMapping(value= {"/maurici"}, method=RequestMethod.GET)
	@Produces(MediaType.APPLICATION_JSON)
	public Object maurici(HttpServletRequest request) {
		Object llistaUsuaris = (Object) serveiUsuari.llistarUsuari();
		return llistaUsuaris;
	}
	
	@RequestMapping(value= {"/llistar-usuaris"}, method=RequestMethod.GET)
	@Produces(MediaType.APPLICATION_JSON)
	public Object llistarUsuaris(HttpServletRequest request) {
		Object llistaUsuaris = (Object) serveiUsuari.llistarUsuari();
		return llistaUsuaris;
	}
	
	@RequestMapping(value= {"/eliminar-usuari-per-id"}, method=RequestMethod.GET)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Result eliminarUsuari(@RequestParam("u_id") int id, HttpServletRequest request) {
		Result res = new Result();
		String resultat = "";
		if(id!=1) {
			resultat = serveiUsuari.eliminarUsuariPerId(id);
		}
		res.setResultat(resultat);
		return res;
	}
	
	@RequestMapping(value= {"/buscar-usuari"}, method=RequestMethod.GET)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Usuari buscarUsuari(@RequestParam("u_id") int id, HttpServletRequest request) {
		Usuari usuariAModificar = serveiUsuari.buscarUsuari(id);
		return usuariAModificar;
	}
	
	@RequestMapping(value= {"/modificar-usuari"}, method=RequestMethod.GET)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Result modificarUsuari(@RequestParam("u_id") int id, @RequestParam("u_username") String username, @RequestParam("u_nom") String nom, @RequestParam("u_cognom") String cognom, @RequestParam("u_correu") String correu, @RequestParam("u_contrassenya") String contrassenya, @RequestParam("u_actiu") Boolean actiu, @RequestParam("u_rol") String rol, HttpServletRequest request) {
		Result res = new Result();
		String resultat = "";
		resultat = serveiUsuari.modificarUsuari(id, username, nom, cognom, correu, contrassenya, actiu, rol);
		res.setResultat(resultat);
		return res;
	}
	
	@RequestMapping(value= {"/crear-usuari"}, method=RequestMethod.GET)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Result crearUsuari(@RequestParam("u_username") String username, @RequestParam("u_nom") String nom, @RequestParam("u_cognom") String cognom, @RequestParam("u_correu") String correu, @RequestParam("u_contrassenya") String contrassenya, @RequestParam("u_actiu") Boolean actiu, @RequestParam("u_rol") String rol, HttpServletRequest request) {
		System.out.println("CREARRRR USUSAAAARIIIIIII");
		Result res = new Result();
		String resultat = "";
		resultat = serveiUsuari.crearUsuari(username, nom, cognom, correu, contrassenya, actiu, rol);
		res.setResultat(resultat);
		return res;
	}
	
	@RequestMapping(value= {"/connexio-router"}, method=RequestMethod.GET)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Result connexioRouter(@RequestParam("r_ip") String ip, @RequestParam("r_usuari") String usuari, @RequestParam("r_contrassenya") String contrassenya) throws Exception {
		Result res = new Result();
		String resultat = "";
		try {
			aConn = ApiConnection.connect(AnonymousSocketFactory.getDefault(), ip, ApiConnection.DEFAULT_TLS_PORT, ApiConnection.DEFAULT_CONNECTION_TIMEOUT);
			//aConn = ApiConnection.connect(AnonymousSocketFactory.getDefault(), Config.HOST, ApiConnection.DEFAULT_TLS_PORT, ApiConnection.DEFAULT_CONNECTION_TIMEOUT);
			
			if(contrassenya==null && usuari=="admin") {
				aConn.login(Config.USERNAME, Config.PASSWORD);
			}else if (contrassenya==null && usuari!="admin"){
				aConn.login(usuari, Config.PASSWORD);
			}else {
				aConn.login(usuari, contrassenya);
			}
			resultat = "ok";
		}
		catch(Exception e) {
			resultat = e.toString();
			System.out.println(e);
		}
		
		res.setResultat(resultat);
		return res;
	}



	
	/**
	@RequestMapping(value= {"/modificar-identity"}, method=RequestMethod.GET)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	protected Result modificarIdentityRouter(@RequestParam("r_identity") String identity, HttpServletRequest request) throws MikrotikApiException {
		System.out.println("ENTRAAAAAA");
		Result res = new Result();
		String resultat = "";
		String cmd = "/system identity set name="+identity+"";
		//ControladorUsuari cu = new ControladorUsuari();
		try {
			//cu.connexioRouter(ip, usuari, contrassenya);
			aConn.execute(cmd);
			resultat = "ok";
		} catch (MikrotikApiException ex) {
			resultat = ex.toString();
			System.out.println(ex);
		} catch (Exception ex) {
			resultat = ex.toString();
			System.out.println(ex);
		}
		res.setResultat(resultat);
		return res;
	}
	**/
	
	/*@RequestMapping(value= {"/executar-comando"}, method=RequestMethod.GET)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Result comandoRouter(@RequestParam("r_comando") String comando, HttpServletRequest request) throws Exception {
		Result res = new Result();
		String resultat = "";
		System.out.println(comando);
		try {
			aConn.execute("/system identity set name="+comando);
			resultat = "ok";
		} catch (MikrotikApiException ex) {
			resultat = ex.toString();
			System.out.println(ex);
		} catch (Exception ex) {
			resultat = ex.toString();
			System.out.println(ex);
		}
		
		res.setResultat(resultat);
		return res;
	}*/
	
	/*@RequestMapping(value= {"/obtindre-identity-router"}, method=RequestMethod.GET)
	@Produces(MediaType.APPLICATION_JSON)
	public Result getRouterIdentity(HttpServletRequest request) throws MikrotikApiException {
		Result res = new Result();
		String resultat = "";
		List<Map<String, String>> results =  aConn.execute("/system identity print");
        //for (Map<String, String> result : results) {
            System.out.println("res: "+results);
        //}
		resultat = "ok";
		try {
			List<Map<String, String>> results =  aConn.execute("/system identity print");
	        for (Map<String, String> result : results) {
	            System.out.println("res: "+result);
	        }
			resultat = "ok";
		} catch (MikrotikApiException ex) {
			resultat = ex.toString();
			System.out.println(ex);
		} catch (Exception ex) {
			resultat = ex.toString();
			System.out.println(ex);
		}
		
		res.setResultat(resultat);
		return res;
	}*/
}
