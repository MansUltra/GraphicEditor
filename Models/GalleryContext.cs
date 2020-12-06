using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Editor_1._0.ViewModels;
namespace Editor_1._0.Models
{
    public class GalleryContext : DbContext
    {
        public DbSet<Author> Authors { get; set; }
        public DbSet<Picture> Pictures { get; set; }

        public GalleryContext(DbContextOptions<GalleryContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

    }
}
