const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../db/storeManager");
const productsModel = require("../../../models/productsModel");

describe('Busca todas os produtos do banco de dados', () => {
    describe('Quando não existe nenhum produto', () => {
        before(() => {
            sinon.stub(connection, 'execute').resolves([[]]);
        });

        after(() => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const [result] = await productsModel.getAll();
            expect(result).to.be.an('array');
        })
        
        it('o array está vazio', async () => {
            const [result] = await productsModel.getAll();
            expect(result).to.be.empty
        });
    });

    describe('Quando existem produtos cadastrados', () => {
        before(() => {
            const resultExecute = [
                {
                    "id": 1,
                    "name": "Martelo de Thor",
                    "quantity": 10
                }
            ];

            sinon.stub(connection, 'execute').resolves(resultExecute);
        });

        after(() => {
            connection.execute.restore();
        })

        it('é um array', async () => {
            const result = await productsModel.getAll()
            expect(result).to.be.an('array')
        })
        
        it('o array não está vazio', async () => {
            const result = await productsModel.getAll();
      
            expect(result).to.not.be.empty;
          });
      
          it('o array possui itens do tipo objeto', async () => {
            const [result] = await productsModel.getAll();
      
            expect(result).to.be.an('object');
          });
      
          it('tais itens possui as propriedades: "id", "title", "releaseYear" e "directedBy"', async () => {
            const [result] = await productsModel.getAll();
      
            expect(result).to.include.all.keys(
              'id',
              'name',
              'quantity',

            );
          });
        });
      
    });

describe("Insere um novo produto no BD", () => {
    const payloadProduct =   { "name": "produto", "quantity": 10 };
  
    before(() => {
      const execute = {
        "id": 4,
        "name": "produto",
        "quantity": 10
    };
  
      sinon.stub(connection, "execute").resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    describe("quando é inserido com sucesso", async () => {
      it("retorna um objeto", async () => {
        const result = await productsModel.add(payloadProduct);
  
        expect(result).to.be.a("object");
      });
  
      it('o objeto possui o "id" do novo produto', async () => {
        const result = await productsModel.add(payloadProduct);
        expect(result).to.have.a.property("id");
      });
    });
  });

