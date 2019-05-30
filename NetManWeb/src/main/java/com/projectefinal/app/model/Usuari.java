package com.projectefinal.app.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "usuari")
public class Usuari {
	
	public Usuari() {}
	
	public Usuari(int id, String correu, String username, String nom, String cognom, String contrassenya, boolean actiu, String rol) {
		super();
		this.id = id;
		this.correu = correu;
		this.username = username;
		this.nom = nom;
		this.cognom = cognom;
		this.contrassenya = contrassenya;
		this.actiu = actiu;
		this.rol = rol;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	@Column(name = "correu")
	private String correu;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "nom")
	private String nom;
	
	@Column(name = "cognom")
	private String cognom;
	
	@Column(name = "contrassenya")
	private String contrassenya;
	
	@Column(name = "actiu")
	private boolean actiu;
	
	@Column(name = "rol")
	private String rol;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCorreu() {
		return correu;
	}

	public void setCorreu(String correu) {
		this.correu = correu;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getCognom() {
		return cognom;
	}

	public void setCognom(String cognom) {
		this.cognom = cognom;
	}

	public String getContrassenya() {
		return contrassenya;
	}

	public void setContrassenya(String contrassenya) {
		this.contrassenya = contrassenya;
	}

	public boolean getActiu() {
		return actiu;
	}
	
	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public void setActiu(boolean actiu) {
		this.actiu = actiu;
	}
}
