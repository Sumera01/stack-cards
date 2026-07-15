function generateStackCard(parsed, manifestFile) {
  const today = new Date().toISOString().split('T')[0];
  
  return {
    stack_card_version: '0.1.0',
    project: {
      name: parsed.name,
      version: parsed.version,
      date_created: today,
      date_updated: today,
      authors: parsed.author ? [parsed.author] : [],
      license: typeof parsed.license === 'string' ? parsed.license : (parsed.license?.type || 'UNLICENSED'),
      contact: ''
    },
    intended_use: {
      primary_use: '',
      intended_users: '',
      out_of_scope: []
    },
    stack: parsed.stack.length > 0 ? parsed.stack : [
      { layer: 'other', technology: 'Unknown', version: 'unknown', source_file: manifestFile }
    ],
    dependencies: {
      direct_count: parsed.directCount || 0,
      transitive_count: parsed.transitiveCount || 0,
      sbom_reference: ''
    },
    security: {
      environment_variables_required: [],
      data_handling: '',
      authentication_method: '',
      known_caveats: []
    },
    ethical_considerations: {
      uses_sensitive_data: false,
      impacts_human_life: false,
      mitigations: [],
      risks_and_harms: ''
    },
    caveats: [],
    alerts: []
  };
}

module.exports = { generateStackCard };
