export default class FotoService {
    constructor(resource){
        this._resource = resource('v1/fotos{/id}');
    }

    lista() {
        return this._resource.query().then(res => res.json(),err => {
            console.log(err)
            throw new Error("Não foi possivel exibir as fotos");
        });
    }
    cadastrar(foto){
        if(foto._id){
            return this._resource.update({ id: foto._id }, foto);
        }else {
            return this._resource.save(foto);
        }
        
    }
    apagar(foto){
        return this._resource.delete({id:foto._id }).then(null,err => {
            console.log(err);
            throw new Error('Não foi possivel remover a foto');
        });
    }
    busca(id){
        return this._resource.get({ id }).then(res => res.json());
    }
    
}