package com.projectefinal.app.sepositori;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectefinal.app.model.Rol;

@Repository("repositoriRol")
public interface RepositoriRol extends JpaRepository<Rol, Integer> {

	Rol buscarPerRol(String rol);
}
