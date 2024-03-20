import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.css'
})
export class NabvarComponent implements OnInit{

  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  buscarPelicula(texto:string){
    texto = texto.trim();
    if(texto.length === 0){
      return;
    }
    this.router.navigate(['/buscar', texto]);
  }
}
