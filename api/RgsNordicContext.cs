using System;
using RgsNordic.Model;
using Microsoft.EntityFrameworkCore;

namespace RgsNordic 
{
    public class RgsNordicContext : DbContext 
    {
        public DbSet<Case> Cases { get; set; }
        public DbSet<Site> Sites { get; set; }
        public DbSet<SiteGridCell> SiteGridCells { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=tcp:rgsnordic-dev-sitegrid.database.windows.net,1433;Initial Catalog=rgsnordic-sitegrid-dev;
                Persist Security Info=False;User ID=sqladmin;Password=Ag6r9Mc7snPgxhxj;MultipleActiveResultSets=False;Encrypt=True;
                TrustServerCertificate=False;Connection Timeout=30;");

        }
    }
}