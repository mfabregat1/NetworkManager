package com.projectefinal.app.sepositori;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectefinal.app.model.Usuari;

@Repository("repositoriUsuari")
public interface RepositoriUsuari extends JpaRepository<Usuari, Long> {

	Usuari buscarPerCorreu(String correu);
}
