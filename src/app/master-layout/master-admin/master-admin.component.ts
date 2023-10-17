
import { Component, OnInit } from '@angular/core';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { MenuItemsMasterService } from '../../master-shared/menu-master/menu-items-master.service';
import { Router } from '@angular/router';
import { ModulesService } from '../../master-services/modules/modules.service';
import swal from 'sweetalert2';
import { UserService } from '../../master-services/User/user.service';
import { SupportService } from '../../master-services/support/support.service';

import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-master-admin',
  templateUrl: './master-admin.component.html',
  styleUrls: ['./master-admin.component.scss'],
  animations: [
    trigger('notificationBottom', [
      state('an-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('an-animate',
        style({
          overflow: 'hidden',
          height: AUTO_STYLE,
        })
      ),
      transition('an-off <=> an-animate', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        width: '300px',
        // transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        width: '0',
        // transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('mobileHeaderNavRight', [
      state('nav-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('nav-on',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('nav-off <=> nav-on', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})




export class MasterAdminComponent  implements OnInit {
  public navType: string;
  public themeLayout: string;
  public verticalPlacement: string;
  public verticalLayout: string;
  public pcodedDeviceType: string;
  public verticalNavType: string;
  public verticalEffect: string;
  public vnavigationView: string;
  public freamType: string;
  public sidebarImg: string;
  public sidebarImgType: string;
  public layoutType: string;

  public headerTheme: string;
  public pcodedHeaderPosition: string;

  public liveNotification: string;
  public liveNotificationClass: string = "";

  public profileNotification: string;
  public profileNotificationClass: string = "";

  public chatSlideInOut: string;
  public innerChatSlideInOut: string;

  public searchWidth: number;
  public searchWidthString: string = "";

  public navRight: string;
  public windowWidth: number;
  public chatTopPosition: string = "";

  public toggleOn: boolean;
  public navBarTheme: string;
  public activeItemTheme: string;
  public pcodedSidebarPosition: string;

  public menuTitleTheme: string;
  public dropDownIcon: string;
  public subItemIcon: string;

  public profileUserCurrent:Number;
  public userNameCurrent:string = "";

  public configOpenRightBar: string = "";
  public displayBoxLayout: string;
  public isVerticalLayoutChecked: boolean;
  public isSidebarChecked: boolean;
  public isHeaderChecked: boolean;
  public headerFixedMargin: string;
  public sidebarFixedHeight: string;
  public itemBorderStyle: string;
  public subItemBorder: boolean;
  public itemBorder: boolean;

  public config: any;
  public itemsFinalMenu: any;
  public functionModule: any;
  public profileText: string ="";
  public countResponseTicket: number = 0;

  constructor(public menuItems: MenuItemsMasterService, private router: Router,  private moduleServices: ModulesService, private supportService: SupportService) {
    console.log('ingreso al admin de la plataforma');
    this.profileUserCurrent=Number(localStorage.getItem('profile'));
    this.userNameCurrent = String(localStorage.getItem('name')) ;
    this.supportService.getCountResponseTicket(localStorage.getItem('userid')).then(data=>{
      const resp:any=data;
      console.log(resp);
      this.countResponseTicket = resp.data;
    }).catch(err=>{
      console.log(err);
    });
    // this.moduleServices.getProfileMenu(this.profileUserCurrent).then(data => {
    //   const resp: any = data;
    //   if (resp.success == true) {
    //     this.functionModule = resp.data;
    //     console.log(this.functionModule)
    //     console.log('entro entro entro');
    //       let array= [];
    //       for(let menu of this.functionModule ){
    //         // console.log(menu);
    //         let subMenu = [];
    //         for (let menusito of menu.function){
    //           let objMenusito = {
    //             state: menusito.route,
    //             name: menusito.description
    //           };
    //             subMenu.push(objMenusito);
    //         }
    //         let main = {
    //           label: 'master',
    //           main: [
    //             {
    //               state: menu.module.state,
    //               short_label: menu.module.short_label,
    //               name: menu.module.name,
    //               type: menu.module.type,
    //               icon: menu.module.icon,
    //               children: subMenu
    //             }
    //           ]
    //         };
    //         array.push(main);
    //       }
    //       console.log(array);
    //     this.itemsFinalMenu=array;
    //   }
    // }).catch(error => {
    //   console.log(error);
    //   swal({
    //     title: 'Error',
    //     text: 'Ha ocurrido un error al mostrar la informacion',
    //     type: 'error'
    //   });
    // });
    if( this.profileUserCurrent==1){
      this.profileText=this.userNameCurrent;
      this.itemsFinalMenu=menuItems.getAll();
      console.log(this.itemsFinalMenu);
    }else if( this.profileUserCurrent==3){
      this.profileText=this.userNameCurrent;
      this.itemsFinalMenu=menuItems.getCreator();
    }else if( this.profileUserCurrent==2){
      this.profileText=this.userNameCurrent;
      this.itemsFinalMenu=menuItems.getSeller();
    }else if( this.profileUserCurrent==5){
      this.profileText=this.userNameCurrent;
      this.itemsFinalMenu=menuItems.getFinancial();
    }else if (this.profileUserCurrent == 6){
      this.profileText=this.userNameCurrent;
      this.itemsFinalMenu=menuItems.getCustomer();
    } else if (this.profileUserCurrent == 7){
      this.profileText=this.userNameCurrent;
      this.itemsFinalMenu=menuItems.getAssign();
    }

    this.navType = 'st2';
    this.themeLayout = 'vertical';
    this.verticalPlacement = 'left';
    this.verticalLayout = 'wide';
    this.pcodedDeviceType = 'tablet';
    this.verticalNavType = 'offcanvas'; //YCV
    this.verticalEffect = 'overlay';
    this.vnavigationView = 'view1';
    this.freamType = 'theme1';
    this.sidebarImg = 'false';
    this.sidebarImgType = 'img1';
    this.layoutType = 'light';

    this.headerTheme = 'themelight5';
    this.pcodedHeaderPosition = 'fixed';

    this.liveNotification = 'an-off';
    this.profileNotification = 'an-off';

    this.chatSlideInOut = 'out';
    this.innerChatSlideInOut = 'out';

    this.searchWidth = 0;

    this.navRight = 'nav-on';

    this.windowWidth = window.innerWidth;
    this.setHeaderAttributes(this.windowWidth);

    this.toggleOn = true;
    this.navBarTheme = 'themelight1';
    this.activeItemTheme = 'theme10';
    this.pcodedSidebarPosition = 'fixed';
    this.menuTitleTheme = 'theme6';
    this.dropDownIcon = 'style3';
    this.subItemIcon = 'style7';

    this.displayBoxLayout = 'd-none';
    this.isVerticalLayoutChecked = false;
    this.isSidebarChecked = true;
    this.isHeaderChecked = true;
    this.headerFixedMargin = '56px';
    this.sidebarFixedHeight = 'calc(100vh - 56px)';
    this.itemBorderStyle = 'none';
    this.subItemBorder = true;
    this.itemBorder = true;

    this.setMenuAttributes(this.windowWidth);
    this.setHeaderAttributes(this.windowWidth);
    this.setionValidate()
    // this.getCountResponseTicket();

    // side-bar image
    /*this.setLayoutType('img');*/

    // dark
    /*this.setLayoutType('dark');*/

    // dark-light
    /*this.setNavBarTheme('theme1');*/

    // light-dark
    /*this.setLayoutType('dark');
    this.setNavBarTheme('themelight1');*/

  }

  setionValidate(){
    let token =localStorage.getItem("token_user");

    if(token == null ){
      this.router.navigateByUrl('masterauth');

    }

  }


  getCountResponseTicket(){
    console.log('consulta count'),
    console.log(localStorage.getItem('userid'));
    this.supportService.getCountResponseTicket(localStorage.getItem('userid')).then(data=>{
      const resp:any=data;
      console.log(resp);
      this.countResponseTicket = resp.data;
    }).catch(err=>{
      console.log(err);
    });
  }


  ngOnInit() {
    this.setBackgroundPattern('pattern1');
    // this.supportService.getCountResponseTicket(localStorage.getItem('userid'))
    /*document.querySelector('body').classList.remove('dark');*/
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  onResize(event:any) {
    this.windowWidth = event.target.innerWidth;
    this.setHeaderAttributes(this.windowWidth);

    let reSizeFlag = false;//
    if (this.pcodedDeviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.pcodedDeviceType === 'mobile' && this.windowWidth < 768) {
      reSizeFlag = false;
    }
    /* for check device */
    if (reSizeFlag) {
      this.setMenuAttributes(this.windowWidth);
    }
  }

  setHeaderAttributes(windowWidth:any) {
    if (windowWidth < 992) {
      this.navRight = 'nav-off';
    } else {
      this.navRight = 'nav-on';
    }
  }

  setMenuAttributes(windowWidth:any) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.pcodedDeviceType = 'tablet';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else if (windowWidth < 768) {
      this.pcodedDeviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.pcodedDeviceType = 'desktop';
      this.verticalNavType = 'offcanvas';  // YCV
      this.verticalEffect = 'overlay';
    }
  }

  toggleHeaderNavRight() {
    this.navRight = this.navRight === 'nav-on' ? 'nav-off' : 'nav-on';
    this.chatTopPosition = this.chatTopPosition === 'nav-on' ? '112px' : '';
    if (this.navRight === 'nav-off' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.navRight === 'nav-off' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  toggleLiveNotification() {
    this.liveNotification = this.liveNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.liveNotificationClass = this.liveNotification === 'an-animate' ? 'active' : '';

    if (this.liveNotification === 'an-animate' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.liveNotification === 'an-animate' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  toggleProfileNotification() {
    this.profileNotification = this.profileNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.profileNotificationClass = this.profileNotification === 'an-animate' ? 'active' : '';

    if (this.profileNotification === 'an-animate' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.profileNotification === 'an-animate' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  notificationOutsideClick(ele: string) {
    if (ele === 'live' && this.liveNotification === 'an-animate') {
      this.toggleLiveNotification();
    } else if (ele === 'profile' && this.profileNotification === 'an-animate') {
      this.toggleProfileNotification();
    }
  }

  toggleChat() {
    this.chatSlideInOut = this.chatSlideInOut === 'out' ? 'in' : 'out';
    if (this.innerChatSlideInOut === 'in') {
      this.innerChatSlideInOut = 'out';
    }
  }

  toggleInnerChat() {
    this.innerChatSlideInOut = this.innerChatSlideInOut === 'out' ? 'in' : 'out';
  }

  searchOn() {
    document.querySelector('#main-search')?.classList.add('open');
    const searchInterval = setInterval(() => {
      if (this.searchWidth >= 200) {
        clearInterval(searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth + 15;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

  searchOff() {
    const searchInterval = setInterval(() => {
      if (this.searchWidth <= 0) {
        document.querySelector('#main-search')?.classList.remove('open');
        clearInterval(searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth - 15;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

  toggleOpened() {
    console.log('entro a menu fuera del IF');
 //   if (this.windowWidth < 992) {
      console.log('entro a menu');
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
      console.log('entro a menu');
      if (this.navRight === 'nav-on') {
        console.log('ingreso aqui');
        // this.toggleHeaderNavRight();

      }
    // }
    this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded'; //YCV

   // this.verticalNavType = 'offcanvas';
  }

  onClickedOutsideSidebar(e: Event) {
  // if ((this.windowWidth < 992 && this.toggleOn && this.verticalNavType !== 'offcanvas') || this.verticalEffect === 'overlay') {
      // this.toggleOn = true;
      //Cambio para ocultar menu test YCV
      this.verticalNavType = 'offcanvas';
    // } // YCV
  }

  toggleRightbar() {
    console.log();
    this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
  }

  setNavBarTheme(theme: string) {
    if (theme === 'themelight1') {
      this.navBarTheme = 'themelight1';
      this.menuTitleTheme = 'theme1';
      this.sidebarImg = 'false';
    } else {
      this.menuTitleTheme = 'theme6';
      this.navBarTheme = 'theme1';
      this.sidebarImg = 'false';
    }
  }

  setLayoutType(type: string) {
    this.layoutType = type;
    if (type === 'dark') {
      this.headerTheme = 'theme1';
      this.sidebarImg = 'false';
      this.navBarTheme = 'theme1';
      this.menuTitleTheme = 'theme6';
      document.querySelector('body')?.classList.add('dark');
    } else if (type === 'light') {
      this.sidebarImg = 'false';
      this.headerTheme = 'themelight5';
      this.navBarTheme = 'themelight1';
      this.menuTitleTheme = 'theme1';
      document.querySelector('body')?.classList.remove('dark');
    } else if (type === 'img') {
      this.sidebarImg = 'true';
      this.headerTheme = 'theme1';
      this.navBarTheme = 'theme1';
      this.menuTitleTheme = 'theme6';
      document.querySelector('body')?.classList.remove('dark');
    }
  }

  setVerticalLayout() {
    this.isVerticalLayoutChecked = !this.isVerticalLayoutChecked;
    if (this.isVerticalLayoutChecked) {
      this.verticalLayout = 'box';
      this.displayBoxLayout = '';
    } else {
      this.verticalLayout = 'wide';
      this.displayBoxLayout = 'd-none';
    }
  }

  setBackgroundPattern(pattern: string) {
    document.querySelector('body')?.setAttribute('themebg-pattern', pattern);
  }

  setSidebarPosition() {
    this.isSidebarChecked = !this.isSidebarChecked;
    this.pcodedSidebarPosition = this.isSidebarChecked === true ? 'fixed' : 'absolute';
    this.sidebarFixedHeight = this.isHeaderChecked === true ? 'calc(100vh + 56px)' : 'calc(100vh - 56px)';
  }

  setHeaderPosition() {
    this.isHeaderChecked = !this.isHeaderChecked;
    this.pcodedHeaderPosition = this.isHeaderChecked === true ? 'fixed' : 'relative';
    this.headerFixedMargin = this.isHeaderChecked === true ? '56px' : '';
  }

}
