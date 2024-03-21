import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { Cast } from '../../interfaces/credits.interface';
import Swiper from 'swiper';
import { PipesModule } from "../../pipes/pipes.module";

@Component({
    selector: 'app-cast-slide-show',
    standalone: true,
    templateUrl: './cast-slide-show.component.html',
    styleUrl: './cast-slide-show.component.css',
    imports: [CommonModule, PipesModule]
})
export class CastSlideShowComponent implements AfterViewInit{

  @Input() cast?:Cast[];

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 4,
      freeMode: true,
      spaceBetween: 15,
    })
  }

}
