using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Editor_1._0
{
    using Models;
    public static class SampleData
    {
       public static void Initialize(GalleryContext context)
        {
            if (!context.Authors.Any())
            {
               context.Add(new Author {FName = "defAuthor", SName = "~", Age = 0, Mail = "def@mail.com",Password="123"});
                
                context.SaveChanges();
                Author first = context.Authors.First();
                context.Add(new Picture { AuthorId = first.Id, Name = "whiteSquare" });
               context.SaveChanges();
            }
        }
    }
}
