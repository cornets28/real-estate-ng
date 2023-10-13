using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Data.Repo;

namespace WebAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;
        public UnitOfWork(DataContext dc) 
        {
            this.dc = dc;
        }
        public ICityRepository CityRepository => new CityRepository(dc);

        public IUserRepository UserRepository => new UserRepository(dc);
        public IPropertyRepository PropertyRepository => new PropertyRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}