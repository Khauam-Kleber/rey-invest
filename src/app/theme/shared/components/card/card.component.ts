import {Component, Input, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
/*import {AnimationBuilder, AnimationService} from 'css-animator';*/
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('collapsedCard', [
      state('collapsed, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('expanded',
        style({
          overflow: 'hidden',
          height: AUTO_STYLE,
        })
      ),
      transition('collapsed <=> expanded', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('cardRemove', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0,
        display: 'none'
      })),
      transition('open <=> closed', animate('400ms')),
    ])
  ]
})

export class CardComponent implements OnInit {
  @Output() removeItemEvent = new EventEmitter<string>();
  @Output() editItemEvent = new EventEmitter<string>();


  @Input() cardTitle: string;
  @Input() cardClass: string;
  @Input() blockClass: string;
  @Input() headerClass: string;
  @Input() options: boolean;
  @Input() hidHeader: boolean;
  @Input() customHeader: boolean;
  @Input() item: any;
  @Input() loading: boolean = true;



  public animation: string;
  public fullIcon: string;
  public isAnimating: boolean;
  /*public animator: AnimationBuilder;
  public animators: AnimationBuilder;*/

  public collapsedCard: string;
  public collapsedIcon: string;

  public loadCard: boolean;

  public cardRemove: string;

  constructor(/*animationService: AnimationService,*/ config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
    this.customHeader = false;
    this.options = true;
    this.hidHeader = false;
    this.cardTitle = 'Card Title';

    /*this.animator = animationService.builder();
    this.animators = animationService.builder();
    this.animator.useVisibility = true;*/
    this.fullIcon = 'icon-maximize';
    this.isAnimating = false;

    this.collapsedCard = 'expanded';
    this.collapsedIcon = 'icon-minus';

    this.loadCard = false;

    this.cardRemove = 'open';
  }

  ngOnInit() {
    if (!this.options || this.hidHeader || this.customHeader) {
      this.collapsedCard = 'false';
    }

    setInterval( () => {
      console.log(this.loading, this.cardTitle)
      if(this.loading){
        this.loadCard = true;
        this.cardClass = 'card-load';
      }else{
        this.loadCard = false;
        this.cardClass = 'expanded';
      }
    }, 3000);
  }

  public fullCardToggle(element: HTMLElement, animation: string, status: boolean) {
    animation = this.cardClass === 'full-card' ? 'zoomOut' : 'zoomIn';
    this.fullIcon = this.cardClass === 'full-card' ? 'icon-maximize' : 'icon-minimize';
    // const duration = this.cardClass === 'full-card' ? 300 : 600;
    this.cardClass = this.cardClass === 'full-card' ? this.cardClass : 'full-card';
    if (status) {
      this.animation = animation;
    }
    this.isAnimating = true;

    /*this.animators
      .setType(this.animation)
      .setDuration(500)
      .setDirection('alternate')
      .setTimingFunction('cubic-bezier(0.1, -0.6, 0.2, 0)')
      .animate(element)
      .then(() => {
        this.isAnimating = false;
      })
      .catch(e => {
        this.isAnimating = false;
      });*/
    setTimeout(() => {
      this.cardClass = animation === 'zoomOut' ? '' : this.cardClass;
      if (this.cardClass === 'full-card') {
        document.querySelector('body').style.overflow = 'hidden';
      } else {
        document.querySelector('body').removeAttribute('style');
      }
    }, 500);
  }

  collapsedCardToggle(event) {
    this.collapsedCard = this.collapsedCard === 'collapsed' ? 'expanded' : 'collapsed';
    this.collapsedIcon = this.collapsedCard === 'collapsed' ? 'icon-plus' : 'icon-minus';
  }

  cardRefresh() {
    if(this.loading){
      this.loadCard = true;
      this.cardClass = 'card-load';
    }else{
      this.loadCard = false;
      this.cardClass = 'expanded';
    }
  }

  cardRemoveAction() {
    if(this.item){
      this.removeItemEvent.emit(this.item);
    }
   
    // this.cardRemove = this.cardRemove === 'closed' ? 'open' : 'closed';
  }

  cardEditAction() {
    if(this.item){
      this.editItemEvent.emit(this.item);
    }
  }

}
