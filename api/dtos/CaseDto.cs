using System;

namespace RgsNordic.Dtos
{
  public class CaseDto
  {
    public Guid Id { get; set; }
    /// <summary>The unique case id used in multiple RGS systems</summary>    
    public string CaseId { get; set; }
    /// <summary>Amount of waste in ton</summary>    
    public double AmountOfWaste { get; set; }
  }
}