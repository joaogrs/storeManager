const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../db/storeManager");
const salesModel = require("../../../models/salesModel");
const { execute } = require("../../../db/storeManager");

describe('Busca todas as vendas do banco de dados', () => {
    describe('Quando não existe nenhuma venda', () => {
        before(() => {
            sinon.stub(connection, 'execute').resolves([[]]);
        });

        after(() => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const [result] = await salesModel.getAll();
            expect(result).to.be.an('array');
        })
        
        it('o array está vazio', async () => {
            const [result] = await salesModel.getAll();
            expect(result).to.be.empty
        });
    });

    describe('Quando existem vendas cadastrados', () => {
        before(() => {
            const resultExecute = [
                {
                    "saleId": 1,
                    "date": "2022-06-01T15:09:49.000Z",
                    "productId": 1,
                    "quantity": 5
                }
            ];

            sinon.stub(connection, 'execute').resolves(resultExecute);
        });

        after(() => {
            connection.execute.restore();
        })

        it('é um array', async () => {
            const result = await salesModel.getAll()
            expect(result).to.be.an('array')
        })
        
        it('o array não está vazio', async () => {
            const result = await salesModel.getAll();
      
            expect(result).to.not.be.empty;
          });
      
          it('o array possui itens do tipo objeto', async () => {
            const [result] = await salesModel.getAll();
      
            expect(result).to.be.an('object');
          });
      
          it('tais itens possui as propriedades: "saleId", "date", "productId" e "quantity"', async () => {
            const [result] = await salesModel.getAll();
      
            expect(result).to.include.all.keys(
              'saleId',
              'date',
              'productId',
              'quantity',
            );
          });
        });
      
    });

describe("Insere uma nova venda no BD", () => {
    const payloadSale = [
        {
            "productId": 1,
            "quantity": 3
        }
    ];
    describe("quando é inserido um id com sucesso na tabela sales", async () => {

        before(() => {
            const execute = [
                {
                  fieldCount: 0,
                  affectedRows: 1,
                  insertId: 3,
                  info: '',
                  serverStatus: 2,
                  warningStatus: 0
                },
                undefined
              ]
        
            sinon.stub(connection, "execute").resolves(execute);
          });
        
          after(() => {
            connection.execute.restore();
          });

      it("retorna o número do id", async () => {
        const result = await salesModel.addNewSaleId(payloadSale);
        expect(result).to.be.a("number");
      });
    });

    describe("quando é inserido com sucesso na tabela sales_products", async () => {
        
    before(() => {
      const execute =
          {
            "productId": 1,
            "quantity": 3
          }

      sinon.stub(connection, "execute").resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });

    it("retorna um objeto", async () => {
        const result = await salesModel.addNewProductSold(3, payloadSale)
        expect(result).to.be.a("object");
      });
    
    it('o objeto possui o "productId" da Venda', async () => {
        const result = await salesModel.addNewProductSold(3, payloadSale);
        expect(result).to.have.a.property("productId");
        });
    });
});
