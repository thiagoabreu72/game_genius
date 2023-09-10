import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'siga-cores';
  desabilita: boolean = false;
  estiloRosa: string = 'background: rgb(255, 0, 255)';
  estiloAzul: string = 'background: RGB(0, 0, 255)';
  estiloVermelho: string = 'background: RGB(255,0,0)';
  estiloVerde: string = 'background: RGB(0, 255, 0)';
  azulClicado: boolean = false;
  vermelhoClicado: boolean = false;
  rosaClicado: boolean = false;
  verdeClicado: boolean = false;
  sequenciaBot: number[] = [];
  sequenciaUsuario: number[] = [];
  pontuacao: number = 0;
  qtdAcerto: number = 0;

  obterClique(valor: any, quem: number) {
    switch (valor) {
      case 'rosa':
        {
          this.estiloRosa = 'background: rgb(255, 0, 150)';
          this.rosaClicado = true;
          setTimeout(() => {
            this.estiloRosa = 'background: rgb(255, 0, 255)';
            this.rosaClicado = false;
          }, 1000);
          if (quem === 1) {
            this.cliqueJogador(1);
          }
        }
        break;
      case 'azul':
        {
          this.estiloAzul = 'background: RGB(0, 0, 155)';
          this.azulClicado = true;
          setTimeout(() => {
            this.azulClicado = false;
            this.estiloAzul = 'background: RGB(0, 0, 255)';
          }, 1000);
          if (quem === 1) {
            this.cliqueJogador(0);
          }
        }
        break;
      case 'verde':
        {
          this.estiloVerde = 'background: RGB(0, 155, 0)';
          this.verdeClicado = true;
          setTimeout(() => {
            this.estiloVerde = 'background: RGB(0, 255, 0)';
            this.verdeClicado = false;
          }, 1000);
          if (quem === 1) {
            this.cliqueJogador(2);
          }
        }
        break;
      case 'vermelho':
        {
          this.estiloVermelho = 'background: RGB(150,0,0)';
          this.vermelhoClicado = true;
          setTimeout(() => {
            this.estiloVermelho = 'background: RGB(255,0,0)';
            this.vermelhoClicado = false;
          }, 1000);
          if (quem === 1) {
            this.cliqueJogador(3);
          }
        }
        break;
    }
  }

  escolhaAleatoria() {
    let min = 0;
    let max = 4;

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  montaSequencia() {
    let valor = this.escolhaAleatoria();
    this.sequenciaBot.push(valor);
    console.log(this.sequenciaBot);
  }

  executaSequencia() {
    let tempo = 1300;
    for (let i of this.sequenciaBot) {
      setTimeout(() => {
        this.capturaSequencia(i);
      }, tempo);
      tempo = tempo + 1300;
    }
  }

  zeraSequenciaBot() {
    this.sequenciaBot = [];
  }

  zeraSequenciaUsuario() {
    this.sequenciaUsuario = [];
  }

  zeraPontuacao() {
    this.pontuacao = 0;
    this.qtdAcerto = 0;
  }

  capturaSequencia(valor: number) {
    switch (valor) {
      case 0:
        this.obterClique('azul', 0);
        break;
      case 1:
        this.obterClique('rosa', 0);
        break;
      case 2:
        this.obterClique('verde', 0);
        break;
      case 3:
        this.obterClique('vermelho', 0);
        break;
    }
  }

  cliqueJogador(opcao: number) {
    this.sequenciaUsuario.push(opcao);
    let clique = this.sequenciaUsuario.length - 1;
    if (this.sequenciaUsuario[clique] == this.sequenciaBot[clique]) {
      if (this.sequenciaUsuario.length === this.sequenciaBot.length) {
        this.pontuacao = this.pontuacao + 100;
        this.qtdAcerto++;
        setTimeout(() => {
          if (this.qtdAcerto === 10) this.pontuacao = this.pontuacao + 1000;
          if (this.qtdAcerto === 20) this.pontuacao = this.pontuacao + 2000;
          if (this.qtdAcerto === 30) this.pontuacao = this.pontuacao + 3000;
          this.montaSequencia();
          this.executaSequencia();
          this.zeraSequenciaUsuario();
        }, 1000);
      }
    } else {
      alert('Você perdeu! Sua pontuação foi ' + this.pontuacao + '!');
    }
  }

  iniciarJogo() {
    this.zeraSequenciaBot();
    this.zeraSequenciaUsuario();
    this.montaSequencia();
    this.executaSequencia();
  }
}
