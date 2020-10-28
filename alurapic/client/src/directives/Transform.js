import Vue from 'vue';
Vue.directive('meu-transform',{

    bind(el,binding, vnode){
        let current = 0;
        el.addEventListener('dblclick',function() {
            let efeito;
            
            if(!binding.arg || binding.arg == 'rotate'){
                if(binding.modifiers.reverse){
                    current -= binding.value || 90;
                }else {
                    current += binding.value || 90;
                }
                efeito = `rotate(${current}deg)`
            }else if(binding.arg == 'scale') {
                let scale = binding.value || 90;
                efeito = `scale(${scale})`;
            }
            el.style.transform = efeito;
            if(binding.modifiers.animate) el.style.transition = `transform 0.5s`;
            
        })
    }

})