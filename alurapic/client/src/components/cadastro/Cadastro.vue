<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>
    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Incluind</h2>
    <form @submit.prevent="grava">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" autocomplete="off" 
        name="titulo"
        v-model="foto.titulo"
        v-validate data-vv-rules="required|min:3|max:30"
        data-vv-as="título">
        <span v-show="errors.has('titulo')" class="erros">{{ errors.first('titulo') }}</span>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" 
        v-model.lazy="foto.url">
        <span v-show="errors.has('titulo')">ERRO</span>
        <imagem-responsiva v-show="foto.url" :src="foto.url"/>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" 
        v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao :rotulo="foto._id?'Alterar':'Incluir'" tipo="submit"/>
        <router-link :to="{name:'home'}"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>
<script>
import ImagemResponsiva from '../shared/image-responsiva/imagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto';
import FotoService from '../../domain/foto/FotoService';
export default {
  data() {
      return{
          foto:new Foto(),
          id: this.$route.params.id
      }
  },
  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },
  methods:{
      grava(){
          this.$validator.validateAll().then(sucess => {

              if(sucess){
                this.service.cadastrar(this.foto).then(() => {
                  if(this.id) this.$router.push({name:'home'})
                  this.foto = new Foto()
                },err => console.log(err));
              }

          })
          
          
      }
  },
  created(){
    this.service = new FotoService(this.$resource);
    if(this.id){
      this.service.busca(this.id).then(foto => this.foto = foto);
    }
  }
}
</script>
<style scoped>
     .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }
  .erros{
    color: red;
  }
</style>