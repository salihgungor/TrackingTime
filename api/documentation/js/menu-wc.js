'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">CRA Documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-7a3e5808f273bd869d13319c6ba342954013f9fa34d8c2f2567ddb7d5cf8c36ec8dd3034951499f6241cc8e17623a469cba6171c0e10038a370864e8b0459396"' : 'data-target="#xs-controllers-links-module-AppModule-7a3e5808f273bd869d13319c6ba342954013f9fa34d8c2f2567ddb7d5cf8c36ec8dd3034951499f6241cc8e17623a469cba6171c0e10038a370864e8b0459396"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7a3e5808f273bd869d13319c6ba342954013f9fa34d8c2f2567ddb7d5cf8c36ec8dd3034951499f6241cc8e17623a469cba6171c0e10038a370864e8b0459396"' :
                                            'id="xs-controllers-links-module-AppModule-7a3e5808f273bd869d13319c6ba342954013f9fa34d8c2f2567ddb7d5cf8c36ec8dd3034951499f6241cc8e17623a469cba6171c0e10038a370864e8b0459396"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7a3e5808f273bd869d13319c6ba342954013f9fa34d8c2f2567ddb7d5cf8c36ec8dd3034951499f6241cc8e17623a469cba6171c0e10038a370864e8b0459396"' : 'data-target="#xs-injectables-links-module-AppModule-7a3e5808f273bd869d13319c6ba342954013f9fa34d8c2f2567ddb7d5cf8c36ec8dd3034951499f6241cc8e17623a469cba6171c0e10038a370864e8b0459396"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7a3e5808f273bd869d13319c6ba342954013f9fa34d8c2f2567ddb7d5cf8c36ec8dd3034951499f6241cc8e17623a469cba6171c0e10038a370864e8b0459396"' :
                                        'id="xs-injectables-links-module-AppModule-7a3e5808f273bd869d13319c6ba342954013f9fa34d8c2f2567ddb7d5cf8c36ec8dd3034951499f6241cc8e17623a469cba6171c0e10038a370864e8b0459396"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-b9651812ebd3d16fd6b7f5869440b73bf38b2f1344f5696f66848d6a5bb8d779668f9ac24eacfb0068c656c3750521137985943e42c380c2ca2f76c56dfa3b1e"' : 'data-target="#xs-controllers-links-module-AuthModule-b9651812ebd3d16fd6b7f5869440b73bf38b2f1344f5696f66848d6a5bb8d779668f9ac24eacfb0068c656c3750521137985943e42c380c2ca2f76c56dfa3b1e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-b9651812ebd3d16fd6b7f5869440b73bf38b2f1344f5696f66848d6a5bb8d779668f9ac24eacfb0068c656c3750521137985943e42c380c2ca2f76c56dfa3b1e"' :
                                            'id="xs-controllers-links-module-AuthModule-b9651812ebd3d16fd6b7f5869440b73bf38b2f1344f5696f66848d6a5bb8d779668f9ac24eacfb0068c656c3750521137985943e42c380c2ca2f76c56dfa3b1e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-b9651812ebd3d16fd6b7f5869440b73bf38b2f1344f5696f66848d6a5bb8d779668f9ac24eacfb0068c656c3750521137985943e42c380c2ca2f76c56dfa3b1e"' : 'data-target="#xs-injectables-links-module-AuthModule-b9651812ebd3d16fd6b7f5869440b73bf38b2f1344f5696f66848d6a5bb8d779668f9ac24eacfb0068c656c3750521137985943e42c380c2ca2f76c56dfa3b1e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-b9651812ebd3d16fd6b7f5869440b73bf38b2f1344f5696f66848d6a5bb8d779668f9ac24eacfb0068c656c3750521137985943e42c380c2ca2f76c56dfa3b1e"' :
                                        'id="xs-injectables-links-module-AuthModule-b9651812ebd3d16fd6b7f5869440b73bf38b2f1344f5696f66848d6a5bb8d779668f9ac24eacfb0068c656c3750521137985943e42c380c2ca2f76c56dfa3b1e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientModule.html" data-type="entity-link" >ClientModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ClientModule-a83e10026705384580dd96b22de5bc8530a290bed250c9d64e602f6fb959072860c9b3801a04ac8b68c0ae4f10e4b4c01e753995425558daea27e59634d8f210"' : 'data-target="#xs-controllers-links-module-ClientModule-a83e10026705384580dd96b22de5bc8530a290bed250c9d64e602f6fb959072860c9b3801a04ac8b68c0ae4f10e4b4c01e753995425558daea27e59634d8f210"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClientModule-a83e10026705384580dd96b22de5bc8530a290bed250c9d64e602f6fb959072860c9b3801a04ac8b68c0ae4f10e4b4c01e753995425558daea27e59634d8f210"' :
                                            'id="xs-controllers-links-module-ClientModule-a83e10026705384580dd96b22de5bc8530a290bed250c9d64e602f6fb959072860c9b3801a04ac8b68c0ae4f10e4b4c01e753995425558daea27e59634d8f210"' }>
                                            <li class="link">
                                                <a href="controllers/ClientController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ClientModule-a83e10026705384580dd96b22de5bc8530a290bed250c9d64e602f6fb959072860c9b3801a04ac8b68c0ae4f10e4b4c01e753995425558daea27e59634d8f210"' : 'data-target="#xs-injectables-links-module-ClientModule-a83e10026705384580dd96b22de5bc8530a290bed250c9d64e602f6fb959072860c9b3801a04ac8b68c0ae4f10e4b4c01e753995425558daea27e59634d8f210"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClientModule-a83e10026705384580dd96b22de5bc8530a290bed250c9d64e602f6fb959072860c9b3801a04ac8b68c0ae4f10e4b4c01e753995425558daea27e59634d8f210"' :
                                        'id="xs-injectables-links-module-ClientModule-a83e10026705384580dd96b22de5bc8530a290bed250c9d64e602f6fb959072860c9b3801a04ac8b68c0ae4f10e4b4c01e753995425558daea27e59634d8f210"' }>
                                        <li class="link">
                                            <a href="injectables/ClientService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LanguageSeederModule.html" data-type="entity-link" >LanguageSeederModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LanguageSeederModule-2afd17da45905e8f03d6f525dae8b9952bbc928fdb801acb9959a3206a102a7e9c63640cf5d9f22525c5dea2bf8eeb9d5e6ea9badaa00cff2c3e67f571684221"' : 'data-target="#xs-injectables-links-module-LanguageSeederModule-2afd17da45905e8f03d6f525dae8b9952bbc928fdb801acb9959a3206a102a7e9c63640cf5d9f22525c5dea2bf8eeb9d5e6ea9badaa00cff2c3e67f571684221"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LanguageSeederModule-2afd17da45905e8f03d6f525dae8b9952bbc928fdb801acb9959a3206a102a7e9c63640cf5d9f22525c5dea2bf8eeb9d5e6ea9badaa00cff2c3e67f571684221"' :
                                        'id="xs-injectables-links-module-LanguageSeederModule-2afd17da45905e8f03d6f525dae8b9952bbc928fdb801acb9959a3206a102a7e9c63640cf5d9f22525c5dea2bf8eeb9d5e6ea9badaa00cff2c3e67f571684221"' }>
                                        <li class="link">
                                            <a href="injectables/UserSeederService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserSeederService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SeederModule.html" data-type="entity-link" >SeederModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SeederModule-5b1ba113b1b826482d7d0ac920e8b7554f91ce1e4e02b82efda998bcb918cd382635617bf94f4b8fe567ce842b86c734d3fd9d541e13792dc69eb18dc1505c26"' : 'data-target="#xs-injectables-links-module-SeederModule-5b1ba113b1b826482d7d0ac920e8b7554f91ce1e4e02b82efda998bcb918cd382635617bf94f4b8fe567ce842b86c734d3fd9d541e13792dc69eb18dc1505c26"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SeederModule-5b1ba113b1b826482d7d0ac920e8b7554f91ce1e4e02b82efda998bcb918cd382635617bf94f4b8fe567ce842b86c734d3fd9d541e13792dc69eb18dc1505c26"' :
                                        'id="xs-injectables-links-module-SeederModule-5b1ba113b1b826482d7d0ac920e8b7554f91ce1e4e02b82efda998bcb918cd382635617bf94f4b8fe567ce842b86c734d3fd9d541e13792dc69eb18dc1505c26"' }>
                                        <li class="link">
                                            <a href="injectables/Seeder.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Seeder</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TrackingtimeModule.html" data-type="entity-link" >TrackingtimeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TrackingtimeModule-8044b2eb3751080bc86c2b90fb80af374c8bad8ffb8f97decc5b668b24246b8b9b2081058a6489fe34dfbb09a4f133b4d6a0672b6c74367bb1e24e2a4141a572"' : 'data-target="#xs-controllers-links-module-TrackingtimeModule-8044b2eb3751080bc86c2b90fb80af374c8bad8ffb8f97decc5b668b24246b8b9b2081058a6489fe34dfbb09a4f133b4d6a0672b6c74367bb1e24e2a4141a572"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TrackingtimeModule-8044b2eb3751080bc86c2b90fb80af374c8bad8ffb8f97decc5b668b24246b8b9b2081058a6489fe34dfbb09a4f133b4d6a0672b6c74367bb1e24e2a4141a572"' :
                                            'id="xs-controllers-links-module-TrackingtimeModule-8044b2eb3751080bc86c2b90fb80af374c8bad8ffb8f97decc5b668b24246b8b9b2081058a6489fe34dfbb09a4f133b4d6a0672b6c74367bb1e24e2a4141a572"' }>
                                            <li class="link">
                                                <a href="controllers/TrackingtimeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrackingtimeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TrackingtimeModule-8044b2eb3751080bc86c2b90fb80af374c8bad8ffb8f97decc5b668b24246b8b9b2081058a6489fe34dfbb09a4f133b4d6a0672b6c74367bb1e24e2a4141a572"' : 'data-target="#xs-injectables-links-module-TrackingtimeModule-8044b2eb3751080bc86c2b90fb80af374c8bad8ffb8f97decc5b668b24246b8b9b2081058a6489fe34dfbb09a4f133b4d6a0672b6c74367bb1e24e2a4141a572"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TrackingtimeModule-8044b2eb3751080bc86c2b90fb80af374c8bad8ffb8f97decc5b668b24246b8b9b2081058a6489fe34dfbb09a4f133b4d6a0672b6c74367bb1e24e2a4141a572"' :
                                        'id="xs-injectables-links-module-TrackingtimeModule-8044b2eb3751080bc86c2b90fb80af374c8bad8ffb8f97decc5b668b24246b8b9b2081058a6489fe34dfbb09a4f133b4d6a0672b6c74367bb1e24e2a4141a572"' }>
                                        <li class="link">
                                            <a href="injectables/TrackingtimeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrackingtimeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-1cb8b48f67d80e0045e2ff819e8533acda0027fcbfaf4501a1eb99c975cb986f640b8aa0aac6aa155f058bc15ccd97ae3412afe721bac90c54cf52872c529fd9"' : 'data-target="#xs-controllers-links-module-UserModule-1cb8b48f67d80e0045e2ff819e8533acda0027fcbfaf4501a1eb99c975cb986f640b8aa0aac6aa155f058bc15ccd97ae3412afe721bac90c54cf52872c529fd9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-1cb8b48f67d80e0045e2ff819e8533acda0027fcbfaf4501a1eb99c975cb986f640b8aa0aac6aa155f058bc15ccd97ae3412afe721bac90c54cf52872c529fd9"' :
                                            'id="xs-controllers-links-module-UserModule-1cb8b48f67d80e0045e2ff819e8533acda0027fcbfaf4501a1eb99c975cb986f640b8aa0aac6aa155f058bc15ccd97ae3412afe721bac90c54cf52872c529fd9"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-1cb8b48f67d80e0045e2ff819e8533acda0027fcbfaf4501a1eb99c975cb986f640b8aa0aac6aa155f058bc15ccd97ae3412afe721bac90c54cf52872c529fd9"' : 'data-target="#xs-injectables-links-module-UserModule-1cb8b48f67d80e0045e2ff819e8533acda0027fcbfaf4501a1eb99c975cb986f640b8aa0aac6aa155f058bc15ccd97ae3412afe721bac90c54cf52872c529fd9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-1cb8b48f67d80e0045e2ff819e8533acda0027fcbfaf4501a1eb99c975cb986f640b8aa0aac6aa155f058bc15ccd97ae3412afe721bac90c54cf52872c529fd9"' :
                                        'id="xs-injectables-links-module-UserModule-1cb8b48f67d80e0045e2ff819e8533acda0027fcbfaf4501a1eb99c975cb986f640b8aa0aac6aa155f058bc15ccd97ae3412afe721bac90c54cf52872c529fd9"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ClientController.html" data-type="entity-link" >ClientController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TrackingtimeController.html" data-type="entity-link" >TrackingtimeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Client.html" data-type="entity-link" >Client</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Trackingtime.html" data-type="entity-link" >Trackingtime</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthLoginDto.html" data-type="entity-link" >AuthLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateClientDto.html" data-type="entity-link" >CreateClientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTrackingtimeDto.html" data-type="entity-link" >CreateTrackingtimeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateClientDto.html" data-type="entity-link" >UpdateClientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePasswordDTO.html" data-type="entity-link" >UpdatePasswordDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStateDto.html" data-type="entity-link" >UpdateStateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTrackingtimeDto.html" data-type="entity-link" >UpdateTrackingtimeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDTO.html" data-type="entity-link" >UpdateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClientService.html" data-type="entity-link" >ClientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Seeder.html" data-type="entity-link" >Seeder</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrackingtimeService.html" data-type="entity-link" >TrackingtimeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TypeOrmConfigService.html" data-type="entity-link" >TypeOrmConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserSeederService.html" data-type="entity-link" >UserSeederService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IClient.html" data-type="entity-link" >IClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITrackingtime.html" data-type="entity-link" >ITrackingtime</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});