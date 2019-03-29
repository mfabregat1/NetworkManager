package com.projectefinal.app.controlador;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.projectefinal.app.model.Usuari;
import com.projectefinal.app.servei.ServeiUsuari;

@Controller
public class ControladorUsuari {
	@Autowired
	private ServeiUsuari serveiUsuari;
	
	@RequestMapping(value= {"/", "/login"}, method=RequestMethod.GET)
	public ModelAndView login() {
		ModelAndView model = new ModelAndView();
		
		model.setViewName("usuari/login");
		return model;
	}
	
	@RequestMapping(value= {"/registrar"}, method=RequestMethod.GET)
	public ModelAndView registrar() {
		ModelAndView model = new ModelAndView();
		Usuari usuari = new Usuari();
		model.addObject("usuari", usuari);
		model.setViewName("usuari/registrar");
		
		return model;
	}
	
	@RequestMapping(value= {"/registrar"}, method=RequestMethod.POST)
	public ModelAndView crearUsuari(@Valid Usuari usuari, BindingResult bindingResult) {
		ModelAndView model = new ModelAndView();
		Usuari usuariExistent = serveiUsuari.buscarUsuariPerCorreu(usuari.getCorreu());
		
		if(usuariExistent != null) {
			bindingResult.rejectValue("correu", "error.usuari", "Aquest correu ja existeix");
		}
		if(bindingResult.hasErrors()) {
			model.setViewName("usuari/registrar");
		}else {
			serveiUsuari.guardarUsuari(usuari);
			model.addObject("msg", "L'usuari s'ha registrat correctament");
			model.addObject("usuari", new Usuari());
			model.setViewName("usuari/registrar");
		}
		
		return model;
	}
	
	@RequestMapping(value= {"/inici/portal"}, method=RequestMethod.GET)
	public ModelAndView inici() {
		ModelAndView model = new ModelAndView();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Usuari usuari = serveiUsuari.buscarUsuariPerCorreu(auth.getName());
		
		model.addObject("nomUsuari", usuari.getNom() + " " + usuari.getCognom());
		model.setViewName("inici/inici");
		return model;
	}
	
	@RequestMapping(value= {"/acces_denegat"}, method=RequestMethod.GET)
	public ModelAndView accesDenegat() {
		ModelAndView model = new ModelAndView();
		model.setViewName("error/acces_denegat");
		
		return model;
	}
		
}
