
export function ObterFrase (cycle){
  let numeroAleatorio = Math.random()
  numeroAleatorio = Math.floor(numeroAleatorio*3)

  const frases = {
    focus: ['Foco total! Nada de distrações :)', 'aaaaaaaaaaaaaa', 'bbbbbbbbbbbb'],
    shortBreak: ['Uma pausa de leve para relaxar, já já voltamos a ativa.', 'ccccccccccccc', 'dddddddddd'],
    longBreak: ['Bora tomar um café e responder aquelas mensagens? =)', 'eeeeeeeeeeeeeeeeee', 'fffffffffff'],
  }

  const fraseEscolhida = () => {
    if (cycle == 'focus') {
      return frases.focus[numeroAleatorio]
    } else if(cycle == 'shortBreak') {
      return frases.shortBreak[numeroAleatorio]
    } else {
      return frases.longBreak[numeroAleatorio]
    }
  }
  return fraseEscolhida()
}