
/**
 * Fraud hooks & simple rules. These are only hooks; tune thresholds in production.
 */
module.exports = {
  flagWithdrawal: (user, amount)=>{
    const flags = [];
    const accountAgeDays = (Date.now() - new Date(user.createdAt).getTime())/(1000*60*60*24);
    if(accountAgeDays < 3) flags.push('new_account');
    if(amount > 100000) flags.push('large_withdraw');
    return flags;
  }
};
