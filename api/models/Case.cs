using System;
using System.Collections.Generic;

namespace RgsNordic.Model
{
  public class Case
  {
    public Guid Id { get; set; }
    /// <summary>The unique case id used in multiple RGS systems</summary>    
    public string CaseId { get; set; }
    /// <summary>Amount of waste in ton</summary>    
    public double AmountOfWaste { get; set; }
    public virtual ICollection<SiteGridCell> SiteGridCells { get; set; }
  }

}
