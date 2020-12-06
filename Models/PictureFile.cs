using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
namespace Editor_1._0.Models
{
    public class PictureFile
    {
        public string Name { get; set; }
        public IFormFile Image { get; set; }
    }
}
