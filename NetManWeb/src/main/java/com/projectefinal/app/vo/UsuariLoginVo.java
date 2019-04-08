package com.projectefinal.app.vo;

public class UsuariLoginVo {

	private String correu;
	private String contrassenya;
	
	public UsuariLoginVo(
			String correu, String contrassenya){
		this.correu=correu;
		this.contrassenya=contrassenya;
	}
	public UsuariLoginVo(){}
	
	public String getCorreu() {
		return correu;
	}
	public void setCorreu(String correu) {
		this.correu = correu;
	}
	public String getContrassenya() {
		return contrassenya;
	}
	public void setContrassenya(String contrassenya) {
		this.contrassenya = contrassenya;
	}
}
